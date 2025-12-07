/**
 * Implementa di un LRU con Map.
 *
 * - Dimensioen fissa ( capacity );
 * - PUT:
 * - Ogni nuovo valore viene inserito in fondo alla lista ( piú recente ).
 * - Elemina il primo se si supera la dimensione massima
 * - GET:
 * - Ritorna il valore e lo sposta in fondo alla lista ( piú recente ).
 *
 * Map garantisce l'ordine di inserimento e fornisce iteratori per attraversarlo, rendendo superflua una linked list per
 * implementare LRU in JavaScript
 *
 * @type {Map<string, number>}
 */
const cache = new Map();

/**
 * @type {number}
 */
const capacity = 4;

/**
 * Get: recupera un valore e lo sposta in fondo (più recente)
 *
 * @param {string} key
 * @returns {any | undefined}
 */
export const get = (key) => {
    if (!cache.has(key)) return;

    const value = cache.get(key);
    if (!value && value !== 0) return;

    cache.delete(key);
    cache.set(key, value);
    return value;
};

/**
 * Put: inserisce un valore, rimuove il meno recente se piena
 *
 * @param {string} key
 * @param {any} value
 */
export const put = (key, value) => {
    if (cache.has(key)) {
        cache.delete(key);
    }

    /**
     * Se piena, rimuovi il primo (meno recente)
     */
    if (cache.size >= capacity) {
        const firstKey = cache.keys().next().value;

        // @ts-expect-error - if cache.size >= capacity firstKey can't be undefined.
        cache.delete(firstKey);
    }

    /**
     * Aggiungi il nuovo elemento in fondo alla lista.
     */
    cache.set(key, value);
};

/**
 * LRU -> Least Recently Used
 *
 * - Cache.keys() -> crea sempre un nuovo iteratore.
 * - Next().value -> sará sempre il primo elemento dell'iteratore.
 *
 * Return next value each call:
 *
 * - Const iterator = cache.keys();
 * - Console.log(iterator.next().value);
 * - Console.log(iterator.next().value);
 */
export const getLRU = () => cache.keys().next().value;

/**
 * MRU -> Most Recently Used
 */
export const getMRU = () => [...cache.keys()].pop();
export const getAll = () => [...cache.values()];
export const size = () => cache.size;
export const clear = () => cache.clear();
export const has = (/** @type {string} */ key) => cache.has(key);
