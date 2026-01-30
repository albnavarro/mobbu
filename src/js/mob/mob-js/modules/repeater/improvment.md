Analisi delle distrazioni/bug non strutturali nel modulo repeater che possono causare leak o malfunzionamenti della GC.

## Cleanup mancante per useNextLoop (Operazioni su Zombie)

#### File:
watch/index.js

#### Problema:
Il callback passato a MobCore.useNextLoop viene eseguito 2 frame dopo, ma nel frattempo il componente potrebbe essere stato distrutto. Si rischia di chiamare `afterUpdate()`, `removeActiveRepeat()` e `unFreezePropById()` su componenti o stati già morti.

#### Rischio:
Lavoro su componenti zombie, potenziale ricreazione di reference che ritardano la GC.

#### Fix:
- Aggiungere controllo di esistenza all'inizio del callback.
- Controllare descrementQueue logic nel caso del return.

```javascript
MobCore.useNextLoop(async () => {
    if (!componentMap.has(id)) return; // Verifica esistenza componente
    if (!getRepeatParent({ id: repeatId })) return; // Verifica esistenza repeater

    if (mainComponent) afterUpdate();
    removeActiveRepeat({...});
    unFreezePropById({ id, prop: state });
});
```


## Manca Try-Catch per le Code (Tick Leak)
#### File:
watch/index.js

#### Problema:
Se beforeUpdate() o updateRepeater() lanciano eccezioni, descrementQueue() e descrementRepeaterQueue() non vengono mai chiamati. Le code (tickQueuque, repeaterTickQueuque) rimangono bloccate in stato incrementato.

#### Rischio:
Crescita indefinita delle code in caso di errori ripetuti, potenziale blocco del sistema.

#### Fix:
Wrappare in try-finally:

```javascript
const descrementQueue = incrementTickQueuque({...});
const descrementRepeaterQueue = incrementRepeaterTickQueuque({...});

try {
    await beforeUpdate();
    await updateRepeater({...});
} finally {
    descrementQueue();
    descrementRepeaterQueue();
}
```

## Array Vuoti Orfani in repeatIdsMap
#### File:
remove-repeat-by-repeat-id.js

#### Problema:
Quando si rimuove l'ultimo repeater di un componente, la mappa mantiene componentId → [] invece di eliminare la chiave.

#### Rischio:
Crescita della mappa con entry vuote senza valore.

Fix:

```javascript
if (valueParsed.length === 0) {
    repeatIdsMap.delete(id);
} else {
    repeatIdsMap.set(id, valueParsed);
}
```
## Stato Globale Sporco in Caso di Errore (setSkipAddUserComponent)

#### File:
add-with-key.js, add-without-key.js

#### Problema:
Lo stato globale skipAddUserComponent viene modificato all'inizio delle operazioni ma ripristinato solo alla fine normale. Se il parsing lancia eccezione, rimane true influenzando tutti i componenti futuri.

#### Rischio:
State pollution globale che rompe il parsing dei componenti successivi.

Fix:

```javascript
const lastSkipUserValue = getSkipAddUserComponent();
setSkipAddUserComponent(true);

try {
    // operazioni di render...
    fragment.append(...);
} finally {
    setSkipAddUserComponent(lastSkipUserValue);
}
```

## Reference a HTMLElement Nativi Non Aggiornati
#### File:
add-without-key.js, set-repeat-native-dom-children.js

#### Problema:
Quando si rimuovono elementi nativi (diff < 0), la mappa nativeDOMChildren in repeatInstancesMap non viene aggiornata immediatamente. Mantiene strong reference a nodi DOM orfani fino alla distruzione completa del repeater.

#### Rischio:
Retention di nodi DOM rimossi, ritardo nella GC.

#### Fix:
Aggiornare esplicitamente dopo la rimozione:

```javascript
childrenFromRepeaterToRemove.forEach((item) => {
    item.element.remove();
});
// Aggiungere:
setRepeaterNativeDOMChildren({ repeatId, id });
```

## Controllo di Esistenza Mancante dopo Await
#### File:
watch/index.js, applyBindProps (bind-props)

#### Problema:
Dopo await beforeUpdate() e await updateRepeater(), non si verifica che il componente o il repeater esistano ancora. Se il componente viene smontato durante operazioni asincrone, si lavora su riferimenti dangling.

#### Rischio:
Operazioni su componenti morti, errori di runtime.

#### Fix:

```javascript
await beforeUpdate();
if (!componentMap.has(id)) return;

await updateRepeater({...});
if (!getRepeatParent({ id: repeatId })) return;
```

### Priorità di Intervento

**Alto** (Blocchi sistema):
- Punto 2: Try-catch per le code
**Medio** (Operazioni su zombie/corruption):
- Punto 1: Cleanup useNextLoop
- Punto 4: Finally per stato globale
- Punto 6: Check post-await
**Basso** (Housekeeping):
- Punto 3: Pulizia mappe vuote
- Punto 5: Aggiornamento nativeDOMChildren
