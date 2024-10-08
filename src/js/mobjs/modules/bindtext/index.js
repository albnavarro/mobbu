//@ts-check

import { mobCore } from '../../../mobCore';
import { getStateById } from '../../component/action/state';
import { watchById } from '../../component/action/watch';

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
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindTextId
 * @returns {HTMLElement}
 */
const getParentBindText = ({ id, bindTextId }) => {
    const item = bindTextMap.get(id);
    if (!item) return;

    const current = item.find((item) => {
        return bindTextId === item.bindTextId;
    });

    return current?.parentNode;
};

/**
 * @returns {number}
 */
export const getBindTextParentSize = () => bindTextMap.size;

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindTextId
 * @param {string[]} params.props
 * @param {() => string} params.render
 * @returns {void}
 */
export const createBindTextWatcher = ({ id, bindTextId, props, render }) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    props.forEach((state) => {
        watchById(id, state, () => {
            /**
             * Wait for all all props is settled.
             */
            if (watchIsRunning) return;
            watchIsRunning = true;

            mobCore.useNextLoop(() => {
                const parentNode = getParentBindText({ id, bindTextId });

                if (!parentNode) {
                    watchIsRunning = false;
                    return;
                }

                parentNode.textContent = '';
                parentNode.insertAdjacentHTML('afterbegin', render());
                watchIsRunning = false;
            });
        });
    });
};
