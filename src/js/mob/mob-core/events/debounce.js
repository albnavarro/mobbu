/* eslint-disable unicorn/no-this-outside-of-class */

/**
 * @template T
 * @param {T} fn
 * @param {number} [time]
 * @returns T
 */
export const debounceFuncion = function debounce(fn, time = 200) {
    /**
    @type {ReturnType<typeof setTimeout>}
    */
    let timeout;

    return function () {
        // @ts-ignore
        const functionCall = () => Reflect.apply(fn, this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};
