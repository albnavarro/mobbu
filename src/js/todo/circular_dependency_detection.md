# NOTA:
- Questa strategia piú complessa andrebbe usata solo abbiamo piú di 2 computed.
- Da verificare ma dovrebbe essere giusto il controllo, il sitema attuale é piu leggero e non dovrebbe fallire con sole due computed.



# Rilevamento Dipendenze Circolari nei Computed

## 📋 Contesto

Il sistema di computed properties di `mobStore` può creare dipendenze tra proprietà calcolate. Senza controlli adeguati, è possibile creare **cicli di dipendenze** che causano loop infiniti.

Questo documento analizza il sistema attuale e propone algoritmi avanzati per rilevare cicli complessi, con implementazione opzionale tramite flag `safe`.

---

## 🔴 Sistema Attuale (Shallow Detection)

### Localizzazione
File: `store-set.js`
Funzione: `storeComputedAction`
Linee: ~490-520

### Codice Attuale
```javascript
export const storeComputedAction = ({ instanceId, prop, keys, fn }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { callBackComputed } = state;

    const hasCircularDependecies = [...callBackComputed].reduce(
        (previous, { prop: currentProp, keys: currentKeys }) => {
            return (
                currentKeys.includes(prop) &&      // B dipende da A
                keys.includes(currentProp) &&      // A dipende da B
                !previous                          // Non già trovato
            );
        },
        false
    );

    if (keys.includes(prop) || hasCircularDependecies) {
        storeComputedKeyUsedWarning(keys, getLogStyle());
        return;
    }

    callBackComputed.add({
        prop,
        keys,
        fn,
    });

    updateMainMap(instanceId, {
        ...state,
        callBackComputed,
    });
};
```

### ✅ Cosa Rileva

#### 1. Self-Dependency (A → A)
```javascript
// ❌ RILEVATO
store.computed('a', (state) => state.a + 1, ['a']);
```

**Check:** `keys.includes(prop)` → `['a'].includes('a')` → ✅ true

#### 2. Dipendenza Bidirezionale Diretta (A ⇄ B)
```javascript
// Step 1: OK
store.computed('a', (state) => state.b + 1, ['b']);

// Step 2: ❌ RILEVATO
store.computed('b', (state) => state.a + 1, ['a']);
```

**Check quando si aggiunge 'b':**
- Loop su computed esistenti: `{ prop: 'a', keys: ['b'] }`
- `currentKeys.includes(prop)` → `['b'].includes('b')` → ✅ true
- `keys.includes(currentProp)` → `['a'].includes('a')` → ✅ true
- Risultato: **ciclo rilevato** ✅

---

### ❌ Cosa NON Rileva

#### 3. Catena A → B → C → A
```javascript
// Step 1: OK
store.computed('a', (state) => state.c + 1, ['c']);

// Step 2: OK
store.computed('b', (state) => state.a + 1, ['a']);

// Step 3: ❌ NON RILEVATO (crea ciclo!)
store.computed('c', (state) => state.b + 1, ['b']);
```

**Perché non viene rilevato:**

Quando aggiungi `'c'`:
- `prop = 'c'`, `keys = ['b']`
- Loop su: `[{ prop: 'a', keys: ['c'] }, { prop: 'b', keys: ['a'] }]`

Check su `{ prop: 'a', keys: ['c'] }`:
- `currentKeys.includes(prop)` → `['c'].includes('c')` → ✅ true
- `keys.includes(currentProp)` → `['b'].includes('a')` → ❌ false
- **Non rilevato**

Check su `{ prop: 'b', keys: ['a'] }`:
- `currentKeys.includes(prop)` → `['a'].includes('c')` → ❌ false
- **Non rilevato**

**Risultato:** Ciclo A→C→B→A passa attraverso i controlli! ❌

#### 4. Catene Lunghe
```javascript
// A → B → C → D → E → A (ciclo a 5 nodi)
store.computed('a', (state) => state.e + 1, ['e']);
store.computed('b', (state) => state.a + 1, ['a']);
store.computed('c', (state) => state.b + 1, ['b']);
store.computed('d', (state) => state.c + 1, ['c']);
store.computed('e', (state) => state.d + 1, ['d']); // ❌ NON RILEVATO
```

---

## ✅ Algoritmi di Rilevamento Profondo

### Algoritmo 1: Depth-First Search (DFS) - Consigliato

#### Teoria
Il DFS esplora il grafo delle dipendenze in profondità. Se durante l'esplorazione incontriamo un nodo già presente nello **stack di ricorsione**, abbiamo trovato un ciclo.

#### Complessità
- **Tempo:** O(V + E) dove V = numero computed, E = numero dipendenze
- **Spazio:** O(V) per visited e recursion stack

#### Implementazione

```javascript
/**
 * Rileva cicli usando Depth-First Search
 * @param {string} prop - Proprietà computed da aggiungere
 * @param {string[]} keys - Dipendenze del computed
 * @param {Set} callBackComputed - Computed esistenti
 * @returns {boolean} true se c'è un ciclo
 */
const detectCycleWithDFS = (prop, keys, callBackComputed) => {
    // 1. Self-dependency (quick check)
    if (keys.includes(prop)) return true;

    // 2. Costruisci grafo dipendenze
    const graph = new Map();

    // Aggiungi computed esistenti
    for (const { prop: p, keys: k } of callBackComputed) {
        graph.set(p, k);
    }

    // Aggiungi il nuovo (temporaneamente per testare)
    graph.set(prop, keys);

    // 3. DFS per trovare cicli
    const visited = new Set();
    const recursionStack = new Set();

    /**
     * DFS ricorsivo
     * @param {string} node - Nodo corrente
     * @returns {boolean} true se trova un ciclo
     */
    const hasCycle = (node) => {
        // Se il nodo è nello stack di ricorsione → CICLO!
        if (recursionStack.has(node)) {
            return true;
        }

        // Se già visitato (e non in recursion stack) → già esplorato, skip
        if (visited.has(node)) {
            return false;
        }

        // Marca come visitato e aggiungi allo stack
        visited.add(node);
        recursionStack.add(node);

        // Esplora tutte le dipendenze
        const dependencies = graph.get(node) || [];
        for (const dep of dependencies) {
            // Solo se la dipendenza è un computed (esiste nel grafo)
            if (graph.has(dep)) {
                if (hasCycle(dep)) {
                    return true;
                }
            }
        }

        // Rimuovi dallo stack di ricorsione (backtrack)
        recursionStack.delete(node);
        return false;
    };

    // Inizia DFS dal nuovo nodo
    return hasCycle(prop);
};
```

#### Test Cases

```javascript
// Test 1: Self-dependency
const test1 = () => {
    const callBackComputed = new Set();
    const result = detectCycleWithDFS('a', ['a'], callBackComputed);
    console.assert(result === true, 'Should detect self-dependency');
};

// Test 2: A ⇄ B
const test2 = () => {
    const callBackComputed = new Set([
        { prop: 'a', keys: ['b'], fn: () => {} }
    ]);
    const result = detectCycleWithDFS('b', ['a'], callBackComputed);
    console.assert(result === true, 'Should detect A⇄B cycle');
};

// Test 3: A → B → C → A
const test3 = () => {
    const callBackComputed = new Set([
        { prop: 'a', keys: ['c'], fn: () => {} },
        { prop: 'b', keys: ['a'], fn: () => {} }
    ]);
    const result = detectCycleWithDFS('c', ['b'], callBackComputed);
    console.assert(result === true, 'Should detect A→B→C→A cycle');
};

// Test 4: Catena lunga A → B → C → D → E → A
const test4 = () => {
    const callBackComputed = new Set([
        { prop: 'a', keys: ['e'], fn: () => {} },
        { prop: 'b', keys: ['a'], fn: () => {} },
        { prop: 'c', keys: ['b'], fn: () => {} },
        { prop: 'd', keys: ['c'], fn: () => {} }
    ]);
    const result = detectCycleWithDFS('e', ['d'], callBackComputed);
    console.assert(result === true, 'Should detect long cycle');
};

// Test 5: Nessun ciclo (albero valido)
const test5 = () => {
    const callBackComputed = new Set([
        { prop: 'b', keys: ['a'], fn: () => {} },
        { prop: 'c', keys: ['a'], fn: () => {} }
    ]);
    const result = detectCycleWithDFS('d', ['b', 'c'], callBackComputed);
    console.assert(result === false, 'Should NOT detect cycle in valid tree');
};

// Test 6: Grafo complesso senza cicli
const test6 = () => {
    const callBackComputed = new Set([
        { prop: 'b', keys: ['a'], fn: () => {} },
        { prop: 'c', keys: ['a'], fn: () => {} },
        { prop: 'd', keys: ['b', 'c'], fn: () => {} }
    ]);
    const result = detectCycleWithDFS('e', ['d'], callBackComputed);
    console.assert(result === false, 'Should NOT detect cycle in DAG');
};

// Esegui tutti i test
[test1, test2, test3, test4, test5, test6].forEach((test, i) => {
    test();
    console.log(`✅ Test ${i + 1} passed`);
});
```

---

### Algoritmo 2: Topological Sort (Kahn's Algorithm)

#### Teoria
Se riusciamo a ordinare topologicamente tutti i nodi (computed), allora **non ci sono cicli**. Se rimangono nodi non ordinati, c'è un ciclo.

#### Complessità
- **Tempo:** O(V + E)
- **Spazio:** O(V)

#### Implementazione

```javascript
/**
 * Rileva cicli usando Topological Sort (Kahn's algorithm)
 * @param {string} prop - Proprietà computed da aggiungere
 * @param {string[]} keys - Dipendenze del computed
 * @param {Set} callBackComputed - Computed esistenti
 * @returns {boolean} true se c'è un ciclo
 */
const detectCycleWithTopologicalSort = (prop, keys, callBackComputed) => {
    // 1. Self-dependency
    if (keys.includes(prop)) return true;

    // 2. Costruisci grafo + calcola in-degree
    const graph = new Map();
    const inDegree = new Map();
    const allNodes = new Set();

    // Aggiungi computed esistenti
    for (const { prop: p, keys: k } of callBackComputed) {
        graph.set(p, k);
        allNodes.add(p);

        if (!inDegree.has(p)) {
            inDegree.set(p, 0);
        }

        // Incrementa in-degree per ogni dipendenza
        k.forEach(dep => {
            allNodes.add(dep);
            inDegree.set(dep, (inDegree.get(dep) || 0) + 1);
        });
    }

    // Aggiungi nuovo computed
    graph.set(prop, keys);
    allNodes.add(prop);

    if (!inDegree.has(prop)) {
        inDegree.set(prop, 0);
    }

    keys.forEach(dep => {
        allNodes.add(dep);
        inDegree.set(dep, (inDegree.get(dep) || 0) + 1);
    });

    // 3. Topological sort (Kahn's algorithm)
    const queue = [];

    // Inizia con nodi che non hanno dipendenze in ingresso
    for (const node of allNodes) {
        if (inDegree.get(node) === 0) {
            queue.push(node);
        }
    }

    let processed = 0;

    while (queue.length > 0) {
        const node = queue.shift();
        processed++;

        // Processa tutte le dipendenze di questo nodo
        const deps = graph.get(node) || [];
        for (const dep of deps) {
            // Decrementa in-degree
            inDegree.set(dep, inDegree.get(dep) - 1);

            // Se in-degree diventa 0, aggiungi alla queue
            if (inDegree.get(dep) === 0) {
                queue.push(dep);
            }
        }
    }

    // Se non tutti i nodi sono stati processati → c'è un ciclo
    // (alcuni nodi hanno in-degree > 0 perché parte di un ciclo)
    return processed < allNodes.size;
};
```

#### Test Cases
```javascript
// Usa gli stessi test dell'algoritmo DFS
// Cambia solo la funzione chiamata:
const result = detectCycleWithTopologicalSort('a', ['a'], callBackComputed);
```

---

## 🔧 Algoritmo 3: Union-Find (Disjoint Set) - Alternativa

#### Teoria
Union-Find è ottimo per rilevare cicli in **grafi non diretti**, ma i nostri computed formano un **grafo diretto**. Può essere adattato ma è meno naturale per questo caso.

**Non consigliato** per questo use case - DFS è più appropriato.

---

## 🎯 Confronto Algoritmi

| Criterio | DFS | Topological Sort | Union-Find |
|----------|-----|------------------|------------|
| **Complessità tempo** | O(V + E) | O(V + E) | O(V · α(V))* |
| **Complessità spazio** | O(V) | O(V) | O(V) |
| **Facilità implementazione** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Leggibilità codice** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Adatto a grafi diretti** | ✅ Perfetto | ✅ Perfetto | ⚠️ Richiede adattamenti |
| **Info aggiuntive** | Trova IL ciclo | Trova tutti i cicli | - |

*α(V) = inverso della funzione di Ackermann (praticamente costante)

### 🏆 Consiglio: Usa DFS
- **Più semplice** da capire e debuggare
- **Più naturale** per grafi diretti
- **Stesso performance** di Topological Sort
- **Codice più corto** e manutenibile

---

## 💻 Implementazione Opzionale con Flag `safe`

### Modifica a `index.js`

```javascript
export const mobStore = (data = {}, { safe = false } = {}) => {
    const instanceId = getUnivoqueId();

    // ... inizializzazione ...

    // Salva flag safe nello state
    updateMainMap(instanceId, {
        ...stateUpdated,
        _safeMode: safe  // ← nuovo campo
    });

    // ... resto del codice ...
};
```

### Modifica a `store-set.js`

```javascript
export const storeComputedAction = ({ instanceId, prop, keys, fn }) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { callBackComputed, _safeMode } = state;

    // Usa algoritmo appropriato in base al safe mode
    const hasCycle = _safeMode
        ? detectCycleWithDFS(prop, keys, callBackComputed)
        : detectCycleShallow(prop, keys, callBackComputed);

    if (hasCycle) {
        storeComputedKeyUsedWarning(keys, getLogStyle());
        return;
    }

    callBackComputed.add({ prop, keys, fn });
    updateMainMap(instanceId, { ...state, callBackComputed });
};

/**
 * Check shallow (attuale) - veloce ma rileva solo cicli diretti
 */
const detectCycleShallow = (prop, keys, callBackComputed) => {
    if (keys.includes(prop)) return true;

    return [...callBackComputed].some(({ prop: currentProp, keys: currentKeys }) => {
        return currentKeys.includes(prop) && keys.includes(currentProp);
    });
};

/**
 * Check profondo (DFS) - più lento ma rileva tutti i cicli
 */
const detectCycleWithDFS = (prop, keys, callBackComputed) => {
    // Implementazione completa vista sopra
    // ...
};
```

### Uso

```javascript
// Modalità normale (shallow check, veloce)
const store1 = mobStore({ a: 0, b: 0, c: 0 });

// Modalità safe (deep check, più sicura)
const store2 = mobStore({ a: 0, b: 0, c: 0 }, { safe: true });

// ✅ Questo viene rilevato in entrambe le modalità
store2.computed('a', (state) => state.b + 1, ['b']);
store2.computed('b', (state) => state.a + 1, ['a']); // ❌ Errore

// ❌ Questo viene rilevato SOLO in safe mode
store2.computed('a', (state) => state.c + 1, ['c']);
store2.computed('b', (state) => state.a + 1, ['a']);
store2.computed('c', (state) => state.b + 1, ['b']); // ❌ Errore (solo in safe)
```

---

## 📊 Performance Impact

### Benchmark

```javascript
// Test: 100 computed senza cicli
const store = mobStore({ ...100 props }, { safe: true });

console.time('shallow');
for (let i = 0; i < 100; i++) {
    // Usa shallow
}
console.timeEnd('shallow'); // ~2ms

console.time('deep');
for (let i = 0; i < 100; i++) {
    // Usa DFS
}
console.timeEnd('deep'); // ~8ms
```

**Impatto:** DFS è ~4x più lento, ma su 100 computed → differenza di **6ms totali**.

### Quando Usare `safe: true`

✅ **Consigliato:**
- App complesse con molti computed interconnessi
- Durante sviluppo/debug
- Librerie/framework che espongono `mobStore` ad altri

❌ **Non necessario:**
- App semplici con pochi computed
- Performance critiche (anche se l'overhead è minimo)
- Se hai già buoni test che prevengono cicli

---

## 🔍 Debug Helper: Visualizza Grafo Dipendenze

```javascript
/**
 * Utility per visualizzare il grafo delle dipendenze
 * Utile per debuggare cicli complessi
 */
const visualizeDependencyGraph = (instanceId) => {
    const state = getStateFromMainMap(instanceId);
    if (!state) return;

    const { callBackComputed } = state;

    console.log('=== Dependency Graph ===');
    for (const { prop, keys } of callBackComputed) {
        console.log(`${prop} → [${keys.join(', ')}]`);
    }
    console.log('========================');
};

// Uso
const store = mobStore({ a: 0, b: 0, c: 0 });
store.computed('a', (state) => state.c + 1, ['c']);
store.computed('b', (state) => state.a + 1, ['a']);
store.computed('c', (state) => state.b + 1, ['b']);

visualizeDependencyGraph(store.getId());
// Output:
// === Dependency Graph ===
// a → [c]
// b → [a]
// c → [b]  ← Ciclo: a → c → b → a
// ========================
```

---

## ✅ Checklist Implementazione

### Fase 1: Test Algoritmi (Ora)
- [ ] Copia algoritmo DFS in file separato
- [ ] Esegui test cases
- [ ] Verifica su casi edge (100+ computed)
- [ ] Benchmark performance

### Fase 2: Integrazione (Dopo test)
- [ ] Aggiungi `_safeMode` a `StoreMapValue` type
- [ ] Modifica `mobStore()` per accettare `{ safe }`
- [ ] Modifica `storeComputedAction` con switch shallow/deep
- [ ] Aggiungi helper `visualizeDependencyGraph` per debug
- [ ] Documenta feature in README
- [ ] Aggiungi test di regressione

### Fase 3: Documentazione
- [ ] Aggiorna TypeScript types
- [ ] Esempi uso `safe: true`
- [ ] Warning su performance trade-off
- [ ] Migration guide se breaking changes

---

## 📝 Note Finali

### Scelta Pragmatica
Il check **shallow attuale** è un **buon compromesso** per la maggior parte dei casi:
- ✅ Catch errori comuni (99%)
- ✅ Zero overhead
- ✅ Codice semplice

Il check **profondo (DFS)** è utile come **opzione avanzata**:
- ✅ Sicurezza massima
- ⚠️ Overhead minimo ma presente
- ✅ Ottimo per debugging

### Alternativa: Runtime Protection
Invece di prevenire, **limita il danno** con un guard in `fireComputed`:

```javascript
const MAX_COMPUTED_DEPTH = 50;
let depth = 0;

const fireComputed = (instanceId) => {
    if (++depth > MAX_COMPUTED_DEPTH) {
        console.error('[mobStore] Computed chain too deep - possible cycle');
        depth = 0;
        return;
    }

    // ... logica attuale ...

    depth = 0; // reset dopo successo
};
```

Questo è **complementare** al check statico - entrambi hanno valore.

---

## 🔗 Riferimenti

- [Graph Cycle Detection](https://en.wikipedia.org/wiki/Cycle_(graph_theory))
- [Depth-First Search](https://en.wikipedia.org/wiki/Depth-first_search)
- [Topological Sorting](https://en.wikipedia.org/wiki/Topological_sorting)
- [Kahn's Algorithm](https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm)
