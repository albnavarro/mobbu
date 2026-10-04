/**
@type{Set<() => any>}
*/
const microtaskQueque = new Set();

/**
 * Lavoriamo su una copia della coda.
 * Ripuliamo la coda prima di eseguirla.
 */
const flush = () => {
    const current = [...microtaskQueque];
    microtaskQueque.clear();

    for (const fn of current) {
        fn();
    }
};

/**
 * @param {() => void} fn
 * @returns {void}
 */
export const useMicrotask = (fn) => {
    microtaskQueque.add(fn);

    if (microtaskQueque.size === 1) {
        queueMicrotask(flush);
    }
};
