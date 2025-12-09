let internalMap = /** @type {Map<string, import('./type').ComponentStore>} */ (
    new Map()
);

/** @type {import('./type').ComponentMapWrapper & Iterable<[string, import('./type').ComponentStore]>} */
export const componentMap = {
    get: (key) => internalMap.get(key),
    set: (key, value) => {
        internalMap.set(key, value);
        return componentMap;
    },
    delete: (key) => internalMap.delete(key),
    has: (key) => internalMap.has(key),
    clear: () => internalMap.clear(),
    get size() {
        return internalMap.size;
    },
    [Symbol.iterator]: () => internalMap[Symbol.iterator](),
    entries: () => internalMap.entries(),
    keys: () => internalMap.keys(),
    values: () => internalMap.values(),
    forEach: (callback) => {
        internalMap.forEach((value, key) => callback(value, key));
    },

    compact() {
        internalMap = new Map(internalMap);
    },
};

export const compactComponentMap = () => componentMap.compact();
