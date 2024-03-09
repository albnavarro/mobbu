// @ts-check

/**
 * @param {import("./type").callbackQueue} param
 * @returns {void}
 */
export const runCallbackQueqe = ({
    callBackWatcher,
    prop,
    newValue,
    oldValue,
    validationValue,
}) => {
    for (const { prop: currentProp, fn } of callBackWatcher.values()) {
        if (currentProp === prop) fn(newValue, oldValue, validationValue);
    }
};

/**
 * @param {Object} obj
 * @param {string} obj.prop
 * @param {any} obj.newValue
 * @param {any} obj.oldValue
 * @param {boolean|Object<string,boolean>} obj.validationValue
 */
// export const  runCallbackQueqeAsync = async({ prop, newValue, oldValue, validationValue }) {
//     for (const { prop: currentProp, fn } of this.callBackWatcher.values()) {
//         if (currentProp === prop)
//             await fn(newValue, oldValue, validationValue);
//     }
// }
