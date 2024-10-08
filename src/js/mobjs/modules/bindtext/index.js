//@ts-check

import { getStateById } from '../../component/action/state';

/** @type {Map<string, import("./type").BindText>} */
export const bindTextMap = new Map();

/**
 * @param {string} id - componentId
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns { string }
 */
export const renderBindText = (id, strings, ...values) => {
    const props = getStateById(id);
    const states = values.map((prop) => props?.[prop] ?? '');

    return strings.raw.reduce(
        (accumulator, currentText, i) =>
            accumulator + currentText + (states?.[i] ?? ''),
        ''
    );
};
