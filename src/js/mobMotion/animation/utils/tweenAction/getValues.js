/**
 * @param {Array} arr
 * @param {string} key
 * @returns {import("./type").valueToparseType<number>}
 *
 * @description
 * Get value of specific key from an array
 * [{ prop: valueByKey }, ...]
 */
export const getValueObj = (arr, key) => {
    return arr
        .map((item) => ({ [item.prop]: Number.parseFloat(item[key]) }))
        .reduce((p, c) => ({ ...p, ...c }), {});
};

/**
 * @param {Array} arr
 * @returns {import("./type").valueToparseType<(number|Function)>}
 *
 * @description
 * Get toValue of specific key from an array ( function or number )
 */
export const getValueObjToNative = (arr) => {
    return arr
        .map((item) => {
            return item.toIsFn
                ? { [item.prop]: item.toFn }
                : { [item.prop]: Number.parseFloat(item.toValue) };
        })
        .reduce((p, c) => ({ ...p, ...c }), {});
};

/**
 * @param {Array} arr
 * @returns {import("./type").valueToparseType<(number|Function)>}
 *
 * @description
 * Get fromValue of specific key from an array ( function or number )
 */
export const getValueObjFromNative = (arr) => {
    return arr
        .map((item) => {
            return item.fromIsFn
                ? { [item.prop]: item.fromFn }
                : { [item.prop]: Number.parseFloat(item.fromValue) };
        })
        .reduce((p, c) => ({ ...p, ...c }), {});
};
