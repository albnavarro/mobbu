//@ts-check

import { getStateById } from '../../component/action/state';

/** @type {Map<string, import("./type").BindText[]>} */
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

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindTextId
 * @param {HTMLElement} params.parentElement
 * @returns {void}
 */
export const addBindTextParent = ({ id, bindTextId, parentElement }) => {
    const items = bindTextMap.get(id);

    const itemsUpdated =
        items && items.length > 0
            ? [...items, { parentNode: parentElement, bindTextId }]
            : [{ parentNode: parentElement, bindTextId }];

    bindTextMap.set(id, itemsUpdated);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {void}
 */
export const removeBindTextParentById = ({ id }) => {
    bindTextMap.delete(id);
};

/**
 * @returns {number}
 */
export const getBindTextParentSize = () => bindTextMap.size;
