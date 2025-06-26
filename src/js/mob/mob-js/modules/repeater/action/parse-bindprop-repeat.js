import { MobCore, MobDetectBindKey } from '@mobCore';

/**
 * @param {string | (() => any)} bindProp
 * @returns {string}
 */
export const parseBindRepeat = (bindProp) => {
    const isString = MobCore.checkType(String, bindProp);
    if (isString) return /** @type {string} */ (bindProp);

    MobDetectBindKey.initializeCurrentDependencies();
    /** @type {() => any} */ (bindProp)();
    return MobDetectBindKey.getFirstCurrentDependencies();
};
