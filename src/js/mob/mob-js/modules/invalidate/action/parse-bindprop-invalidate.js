import { MobCore, MobDetectBindKey } from '../../../../mob-core';

/**
 * @param {string | string[] | (() => any)[] | (() => any) | undefined} bindProp
 * @returns {string[]}
 */
export const parseBindInvalidate = (bindProp) => {
    const bindArray = MobCore.checkType(Array, bindProp)
        ? bindProp
        : [bindProp];

    // @ts-expect-error bindArray is forced to be an array.
    return bindArray.map((item) => {
        const isString = MobCore.checkType(String, item);
        if (isString) return /** @type {string} */ (item);

        MobDetectBindKey.initializeCurrentDependencies();
        /** @type {() => any} */ (item)();
        return MobDetectBindKey.getFirstCurrentDependencies();
    });
};
