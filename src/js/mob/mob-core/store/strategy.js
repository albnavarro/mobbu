/**
 * Shallow copy.
 *
 * Con shallow copy creiamo una copia del `wrapper` che contiene i nostri dati, ma le proprietà interne rimangono
 * riferimenti condivisi, non si tratta di immutabilitá.
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
 * @type {boolean}
 */
export const useStoreCopy = true;
