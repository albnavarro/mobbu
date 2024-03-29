// @ts-check

/**
 * @type {Map<string,import("./type").repeaterType>}
 */
export const repeatMap = new Map();

/**
 * @param {object} mainObject
 * @param {string} mainObject.repeatId
 * @param {import("./type").repeaterType} mainObject.obj
 *
 * @description
 * Add new repeater id and props.
 * The repeater will execute after component render.
 */
export const addRepeat = ({ repeatId, obj }) => {
    repeatMap.set(repeatId, obj);
};
