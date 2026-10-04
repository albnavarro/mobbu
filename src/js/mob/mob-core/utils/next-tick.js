/**
@type{Set<() => any>}
*/
const settimeOutQueque = new Set();

/**
 * @param {() => void} fn
 * @returns {void}
 */
export const useNextLoop = (fn) => {
    settimeOutQueque.add(fn);

    if (settimeOutQueque.size === 1) {
        setTimeout(() => {
            /**
             * Lavoriamo su una copia della coda.
             * Ripuliamo la coda prima di eseguirla.
             */
            const current = [...settimeOutQueque];
            settimeOutQueque.clear();

            for (const fn of current) {
                fn();
            }
        }, 0);
    }
};
