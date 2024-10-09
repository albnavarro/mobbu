//@ts-check

import { mobCore } from '../../../mobCore';
import { getStateById } from '../../component/action/state';
import { watchById } from '../../component/action/watch';

/** @type {Map<string, import("./type").BindText[]>} */
export const bindTextMap = new Map();

/** @type {Map<Element, import('./type').BindTextPlaceHolder>} */
export const bindTextPlaceHolderMap = new Map();

/**
 * @param {object} params
 * @param {Element} params.host
 * @param {string} params.componentId
 * @param {string} params.bindTextId
 * @returns {void}
 */
export const addBindTextPlaceHolderMap = ({
    host,
    componentId,
    bindTextId,
}) => {
    bindTextPlaceHolderMap.set(host, {
        componentId,
        bindTextId,
    });
};

/**
 * @param {string} id - componentId
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns { string }
 */
export const renderBindText = (id, strings, ...values) => {
    const props = getStateById(id);

    const states = values.map((prop) => {
        /**
         * Get value if prop is:
         * bindText`${'obj.prop1.prop2'}`
         */
        const propsToArray = prop.split('.');
        return propsToArray.reduce(
            (
                /** @type {{ [x: string]: any; }} */ previous,
                /** @type {string | number} */ current
            ) => {
                return previous?.[current] ?? previous;
            },
            props
        );
    });

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
            ? (() => {
                  /**
                   * When placeholder change position ( slot/repeater )
                   * Add multiple time.
                   * Remove the old and use last with last parent element.
                   */
                  const itemsFiltered = items.filter(
                      (item) => item.bindTextId !== bindTextId
                  );

                  return [
                      ...itemsFiltered,
                      { parentNode: parentElement, bindTextId },
                  ];
              })()
            : [{ parentNode: parentElement, bindTextId }];

    bindTextMap.set(id, itemsUpdated);
};

/**
 * @description
 * At the end of parse delete web component and add data to real map
 * New map has componentId as key, so easy to destroy, one map for every bindText in component.
 * We need end of parse to get real parent element ( slot/repeater/invalidate issue ).
 * @returns {void}
 */
export const switchBindTextMap = () => {
    [...bindTextPlaceHolderMap].forEach(
        ([placeholder, { componentId, bindTextId }]) => {
            addBindTextParent({
                id: componentId,
                bindTextId,
                parentElement: placeholder.parentElement,
            });

            // @ts-ignore
            placeholder?.removeCustomComponent?.();
            placeholder?.remove();
        }
    );

    bindTextPlaceHolderMap.clear();
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
 * @returns {number}
 */
export const getBindTextPlaceholderSize = () => bindTextPlaceHolderMap.size;

/**
 * @param {string} id
 * @param {string} bindTextId
 * @param {string[]} props
 * @param {() => string} render
 * @returns {void}
 */
export const createBindTextWatcher = (id, bindTextId, render, ...props) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    props.forEach((state) => {
        /**
         * Get state to watch if prop is:
         * bindText`${'obj.prop1.prop2'}`
         */
        const propsToArray = state.split('.');
        const stateToWatch = propsToArray?.[0];

        watchById(id, stateToWatch, () => {
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
