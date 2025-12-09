let internalBindPropsMap =
    /** @type {Map<string, import('./type').BindPropsMap>} */ (new Map());

/** @type {import('./type').BindPropsMapWrapper & Iterable<[string, import('./type').BindPropsMap]>} */
export const bindPropsMap = {
    get: (key) => internalBindPropsMap.get(key),
    set: (key, value) => {
        internalBindPropsMap.set(key, value);
        return bindPropsMap;
    },
    delete: (key) => internalBindPropsMap.delete(key),
    has: (key) => internalBindPropsMap.has(key),
    clear: () => internalBindPropsMap.clear(),
    get size() {
        return internalBindPropsMap.size;
    },
    [Symbol.iterator]: () => internalBindPropsMap[Symbol.iterator](),
    entries: () => internalBindPropsMap.entries(),
    keys: () => internalBindPropsMap.keys(),
    values: () => internalBindPropsMap.values(),
    forEach: (callback) => {
        internalBindPropsMap.forEach((value, key) => callback(value, key));
    },
    compact() {
        internalBindPropsMap = new Map(internalBindPropsMap);
    },
};

let internalbindComponentTobindId = /** @type {Map<string, string>} */ (
    new Map()
);

/** @type {import('./type').BindComponentTobindIdWrapper & Iterable<[string, string]>} */
export const bindComponentTobindId = {
    get: (key) => internalbindComponentTobindId.get(key),
    set: (key, value) => {
        internalbindComponentTobindId.set(key, value);
        return bindComponentTobindId;
    },
    delete: (key) => internalbindComponentTobindId.delete(key),
    has: (key) => internalbindComponentTobindId.has(key),
    clear: () => internalbindComponentTobindId.clear(),
    get size() {
        return internalbindComponentTobindId.size;
    },
    [Symbol.iterator]: () => internalbindComponentTobindId[Symbol.iterator](),
    entries: () => internalbindComponentTobindId.entries(),
    keys: () => internalbindComponentTobindId.keys(),
    values: () => internalbindComponentTobindId.values(),
    forEach: (callback) => {
        internalbindComponentTobindId.forEach((value, key) =>
            callback(value, key)
        );
    },
    compact() {
        internalbindComponentTobindId = new Map(internalbindComponentTobindId);
    },
};

export const compactBindPropsMap = () => {
    bindPropsMap.compact();
    bindComponentTobindId.compact();
};
