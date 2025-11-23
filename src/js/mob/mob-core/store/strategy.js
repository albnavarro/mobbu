/**
 * Store copy strategy configuration.
 *
 * Con shallow copy creiamo una copia del `wrapper` che contiene i nostri dati, ma le proprietà interne rimangono
 * riferimenti condivisi.
 *
 * ```js
 * {
 *   store: Store_A,                 ← Riferimento condiviso
 *   validationStatusObject: VSO_A,  ← Riferimento condiviso
 *   callBackWatcher: Map_A,         ← Riferimento condiviso
 *   computedRunning: false,         ← Primitivo (copiato per valore)
 *   ...
 * }
 * ```
 *
 * ## Casi d'Uso e Sicurezza
 *
 * ### Case A) Riassegnazione primo livello
 *
 * ```js
 * store[prop] = newValue;
 * ```
 *
 * - Riassegnazione di proprietà di primo livello
 * - Muta l'oggetto `store` condiviso direttamente in storeMap
 * - Non crea race condition perché:
 * - Ogni `prop` è indipendente
 * - "Last write wins" è comportamento corretto
 * - Operazioni su chiavi diverse non si interferiscono
 * - UpdateMainMap è tecnicamente ridondante ma mantiene consistenza
 *
 * ### Case B) Mutazione nested (PROBLEMA)
 *
 * ```js
 * validationStatusObject[prop][subProp] = value;
 * ```
 *
 * - Mutazione di oggetto nested senza riassegnazione
 * - Muta l'oggetto originale in storeMap a livello nested
 * - Può creare race condition se:
 * - Callback paralleli modificano sub-proprietà diverse
 * - Si usa riassegnazione che sovrascrive l'intero oggetto [prop]
 * - UpdateMainMap è ridondante (oggetto già mutato)
 *
 * ### Soluzione per Case B)
 *
 * ```js
 * validationStatusObject[prop] = {
 *     ...validationStatusObject[prop],
 *     [subProp]: value,
 * };
 * ```
 *
 * - Crea nuovo oggetto nested ad ogni modifica
 * - Non muta direttamente storeMap
 * - UpdateMainMap diventa necessario
 *
 * ## SHALLOW COPY (attuale - no real immutability)
 *
 * L'uso di updateMainMap è per lo più ridondante perché modifichiamo riferimenti condivisi che sono già mutati in
 * storeMap. Viene mantenuta questa strategia per:
 *
 * - Consistenza del codice
 * - Leggibilità e manutenibilità
 * - Preparazione per futura vera immutabilità
 * - Layer di sicurezza
 *
 * ## DEEP COPY (future option - REAL IMMUTABILITY)
 *
 * Il codice è già predisposto per passare a vera immutabilità senza modifiche al business logic:
 *
 * - I dati vengono recuperati tramite getStateFromMainMap()
 * - I dati modificati vengono salvati tramite updateMainMap()
 * - Con deep copy, updateMainMap diventa veramente necessario
 * - CONS: Costo computazionale molto più elevato
 * - Richiede: Modifica solo a getStateFromMainMap() per ritornare deep copy
 *
 * @type {boolean}
 */
export const useStoreCopy = true;
