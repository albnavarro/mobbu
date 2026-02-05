# Deep Proxy Read-Only: Blocco Mutazioni Profonde

## Problema

Attualmente il proxy restituito da `getProxi()` è **shallow** (superficiale). Quando si accede a una proprietà che è un oggetto, viene restituito il riferimento diretto all'oggetto in memoria:

```javascript
const proxi = myStore.getProxi();
proxi.myObj.nestedProp = 2;  // Modifica diretta, nessuna reattività
```

**Effetti:**
- La modifica avviene silenziosamente senza attivare watcher o computed
- Lo stato dello store risulta desincronizzato rispetto all'UI
- I vincoli di tipo e validazione vengono bypassati

---

## Soluzione Proposta

Invece di implementare un sistema di deep reactivity (complesso e costoso), la proposta è di **bloccare le modifiche dirette** sulle proprietà nidificate e **avvisare lo sviluppatore** con un warning che indica il pattern corretto.

### Comportamento Atteso

```javascript
const proxi = myStore.getProxi();

// Tentativo di modifica diretta
proxi.myObj.nestedProp = 2;
// Console: [Store Warning] Tentativo di modifica diretta bloccato: "myObj.nestedProp".
//          Usa la riassegnazione: proxi.myObj = { ...proxi.myObj, nestedProp: 2 }

// Pattern corretto (funziona)
proxi.myObj = { ...proxi.myObj, nestedProp: 2 };
```

---

## Implementazione

### 1. Funzione Helper: `createReadOnlyDeepProxy`

Questa funzione crea un proxy ricorsivo che intercetta e blocca le modifiche su oggetti nidificati.

```javascript
/**
 * @type {WeakMap<object, object>}
 *
 * Cache per evitare di ricreare proxy per lo stesso oggetto.
 * WeakMap permette garbage collection automatica quando l'oggetto originale
 * non è più referenziato.
 */
const deepProxyCache = new WeakMap();

/**
 * Verifica se un valore deve essere wrappato in un deep proxy.
 *
 * @param {any} value
 * @returns {boolean}
 */
const shouldWrapInDeepProxy = (value) => {
    return (
        value !== null &&
        typeof value === 'object' &&
        !(value instanceof Map) &&
        !(value instanceof Set) &&
        !(value instanceof Date) &&
        !(value instanceof RegExp) &&
        !(value instanceof Error) &&
        !(value instanceof Promise) &&
        !ArrayBuffer.isView(value)
    );
};

/**
 * Crea un proxy read-only ricorsivo che blocca le modifiche
 * dirette sulle proprietà nidificate e lancia un warning.
 *
 * @param {object} value - Oggetto da wrappare
 * @param {string} rootProp - Nome della proprietà radice (per il warning)
 * @param {string} path - Percorso completo della proprietà corrente
 * @param {string} logStyle - Stile CSS per il warning in console
 * @returns {object}
 */
const createReadOnlyDeepProxy = (value, rootProp, path, logStyle) => {
    /**
     * Check cache per evitare duplicati.
     * Nota: la cache è indicizzata per oggetto, quindi oggetti diversi
     * con lo stesso contenuto avranno proxy diversi.
     */
    const cached = deepProxyCache.get(value);
    if (cached) return cached;

    const proxy = new Proxy(value, {
        /**
         * Blocca tutte le operazioni di scrittura.
         */
        set(_target, prop, _newValue) {
            const fullPath = `${path}.${String(prop)}`;

            console.warn(
                `%c[Store Warning]%c Tentativo di modifica diretta bloccato: "${fullPath}".\n` +
                    `Per modificare questa proprietà, riassegna l'oggetto radice:\n` +
                    `proxi.${rootProp} = { ...proxi.${rootProp}, ... }`,
                logStyle,
                ''
            );

            return false;
        },

        /**
         * Blocca le operazioni di delete.
         */
        deleteProperty(_target, prop) {
            const fullPath = `${path}.${String(prop)}`;

            console.warn(
                `%c[Store Warning]%c Tentativo di delete bloccato: "${fullPath}".\n` +
                    `Per rimuovere questa proprietà, riassegna l'oggetto radice:\n` +
                    `proxi.${rootProp} = { ...proxi.${rootProp} } // senza la proprietà`,
                logStyle,
                ''
            );

            return false;
        },

        /**
         * Intercetta l'accesso alle proprietà.
         * Se la proprietà è un oggetto, restituisce ricorsivamente un deep proxy.
         */
        get(target, prop) {
            /**
             * Gestione proprietà speciali per compatibilità.
             */
            if (prop === Symbol.toStringTag) return target[prop];
            if (prop === Symbol.iterator) return target[prop];

            const propValue = target[prop];

            /**
             * Se il valore è una funzione (es. metodi di Array), la bindiamo
             * al target originale per mantenere il comportamento corretto.
             */
            if (typeof propValue === 'function') {
                return propValue.bind(target);
            }

            /**
             * Ricorsione per oggetti nidificati.
             */
            if (shouldWrapInDeepProxy(propValue)) {
                return createReadOnlyDeepProxy(
                    propValue,
                    rootProp,
                    `${path}.${String(prop)}`,
                    logStyle
                );
            }

            return propValue;
        },

        /**
         * Supporto per `prop in proxi.obj`.
         */
        has(target, prop) {
            return prop in target;
        },

        /**
         * Supporto per Object.keys(), for...in, etc.
         */
        ownKeys(target) {
            return Reflect.ownKeys(target);
        },

        /**
         * Necessario per Object.keys() e simili.
         */
        getOwnPropertyDescriptor(target, prop) {
            return Object.getOwnPropertyDescriptor(target, prop);
        },
    });

    deepProxyCache.set(value, proxy);
    return proxy;
};
```

---

### 2. Integrazione in `createDynamicProxy`

Modificare il trap `get` nella funzione `createDynamicProxy` per wrappare gli oggetti nidificati:

```javascript
const createDynamicProxy = (instanceId) => {
    const logStyle = getLogStyle();

    return new Proxy(
        {},
        {
            set(_, /** @type {string} */ prop, value) {
                // ... codice esistente invariato ...
            },

            get(_, /** @type {string} */ prop) {
                if (!storeMap.has(instanceId)) return;

                const state = storeMap.get(instanceId);
                if (!state) return;

                /**
                 * GET: cerca prima in self, poi nei binded
                 */
                if (prop in state.store) {
                    setCurrentDependencies(prop);
                    const value = state.store[prop];

                    /**
                     * Wrap oggetti nidificati in read-only deep proxy.
                     */
                    if (shouldWrapInDeepProxy(value)) {
                        return createReadOnlyDeepProxy(
                            value,
                            prop,  // rootProp
                            prop,  // path iniziale
                            logStyle
                        );
                    }

                    return value;
                }

                /**
                 * Cerca nei binded stores.
                 */
                for (const bindId of state.bindInstance) {
                    const bindState = storeMap.get(bindId);

                    if (bindState && prop in bindState.store) {
                        setCurrentDependencies(prop);
                        const value = bindState.store[prop];

                        /**
                         * Wrap oggetti nidificati in read-only deep proxy.
                         */
                        if (shouldWrapInDeepProxy(value)) {
                            return createReadOnlyDeepProxy(
                                value,
                                prop,
                                prop,
                                logStyle
                            );
                        }

                        return value;
                    }
                }
            },

            has(_, /** @type {string} */ prop) {
                // ... codice esistente invariato ...
            },
        }
    );
};
```

---

## Note Tecniche

### Cache con WeakMap

La `WeakMap` è utilizzata per:
1. **Evitare duplicati**: Lo stesso oggetto restituisce sempre lo stesso proxy
2. **Garbage collection**: Quando l'oggetto originale non è più referenziato, anche il proxy viene rimosso automaticamente
3. **Performance**: Evita di creare nuovi proxy ad ogni accesso

### Invalidazione Cache

La cache si auto-invalida naturalmente perché:
- Quando l'utente riassegna `proxi.myObj = { ... }`, viene creato un **nuovo oggetto**
- Il nuovo oggetto non è presente nella cache, quindi viene creato un nuovo proxy
- Il vecchio oggetto (e il suo proxy) vengono garbage collected

### Tipi Esclusi dal Wrapping

I seguenti tipi **non vengono wrappati** in un deep proxy:
- `null`
- Primitive (`string`, `number`, `boolean`, `symbol`, `bigint`)
- `Map` e `Set` (gestiti separatamente dallo store)
- `Date`, `RegExp`, `Error` (oggetti built-in immutabili o con semantica speciale)
- `Promise` (oggetti asincroni)
- Typed Arrays (`ArrayBuffer.isView`)

### Compatibilità Array

Gli array vengono wrappati correttamente. I metodi mutanti (`push`, `pop`, `splice`, etc.) sono bindati al target originale ma le modifiche dirette agli indici vengono bloccate:

```javascript
proxi.myArray[0] = 'new';     // Bloccato con warning
proxi.myArray.push('item');   // Esegue ma non scatena reattività (warning consigliato)
proxi.myArray = [...proxi.myArray, 'item'];  // Pattern corretto
```

---

## Test di Verifica

```javascript
const myStore = MobCore.createStore({
    user: () => ({
        value: {
            name: 'John',
            address: {
                city: 'Rome',
                zip: '00100'
            }
        },
        type: 'any',
    }),
    items: () => ({
        value: [1, 2, 3],
        type: Array,
    }),
});

const proxi = myStore.getProxi();

// Test 1: Modifica diretta primo livello - BLOCCATA
proxi.user.name = 'Jane';
// Warning: "user.name"

// Test 2: Modifica diretta secondo livello - BLOCCATA
proxi.user.address.city = 'Milan';
// Warning: "user.address.city"

// Test 3: Modifica array per indice - BLOCCATA
proxi.items[0] = 99;
// Warning: "items.0"

// Test 4: Riassegnazione completa - FUNZIONA
proxi.user = { ...proxi.user, name: 'Jane' };
// OK, watcher attivati

// Test 5: Riassegnazione nidificata - FUNZIONA
proxi.user = {
    ...proxi.user,
    address: { ...proxi.user.address, city: 'Milan' }
};
// OK, watcher attivati
```

---

## Valutazione Impatto

| Aspetto | Valutazione |
|---------|-------------|
| **Complessità implementazione** | Media (~80 righe) |
| **Rischio regressioni** | Basso (comportamento aggiuntivo, non modifiche) |
| **Performance overhead** | Basso (cache WeakMap + lazy proxy) |
| **Developer Experience** | Alta (errori chiari, pattern guidato) |
| **Breaking changes** | Nessuno (codice esistente continua a funzionare) |

---

## Alternative Considerate

### 1. Deep Reactivity Completa
**Scartata**: Troppo complessa, overhead significativo, difficile gestire edge cases.

### 2. Object.freeze Ricorsivo
**Scartata**: Blocca le modifiche ma lancia errori invece di warning, non indica il pattern corretto.

### 3. Nessuna Modifica (Solo Documentazione)
**Scartata**: Gli sviluppatori potrebbero non leggere la documentazione e incontrare bug silenziosi.

---

## Conclusione

Questa soluzione rappresenta un buon compromesso tra:
- **Sicurezza**: Previene bug silenziosi da mutazioni dirette
- **Developer Experience**: Warning chiari con suggerimento del pattern corretto
- **Performance**: Overhead minimo grazie alla cache
- **Semplicità**: Implementazione contenuta e manutenibile
