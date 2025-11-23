/**
 * Shallow copy.
 *
 * With shallow create a copy of `wrapper` witch contains data, but props is shared reference.
 *
 * - This is not immutability, this is not the scope.
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
 * Update function in not really necessary, we whore with shared reference.
 *
 * - BUT:
 * - Low computation effort.
 * - More easy for debugging.
 * - I clearly when we open and close map, logic is more readable.
 * - Props like `computedRunning: false` need update, for consistency update all prop in map value.
 *
 * @type {boolean}
 */
export const useStoreCopy = true;
