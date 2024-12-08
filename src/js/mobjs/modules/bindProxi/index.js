import { mobCore } from '../../../mobCore';
import { watchById } from '../../component/action/watch';

/** @type {Map<string, import("./type").BindProxi[]>} */
export const bindProxiMap = new Map();

/** @type {Map<Element, import('./type').BindProxiPlaceHolder>} */
export const bindProxiPlaceHolderMap = new Map();

/**
 * @param {object} params
 * @param {Element} params.host
 * @param {string} params.componentId
 * @param {string} params.bindProxiId
 * @returns {void}
 */
export const addBindProxiPlaceHolderMap = ({
    host,
    componentId,
    bindProxiId,
}) => {
    bindProxiPlaceHolderMap.set(host, {
        componentId,
        bindProxiId,
    });
};

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns { string }
 */
export const renderBindProxi = (strings, ...values) => {
    return strings.raw.reduce(
        (accumulator, currentText, i) =>
            mobCore.checkType(Function, values?.[i])
                ? accumulator + currentText + (values?.[i]?.() ?? '')
                : accumulator,
        ''
    );
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindProxiId
 * @param {HTMLElement} params.parentElement
 * @returns {void}
 */
export const addBindProxiParent = ({ id, bindProxiId, parentElement }) => {
    const items = bindProxiMap.get(id);

    const itemsUpdated =
        items && items.length > 0
            ? (() => {
                  /**
                   * When placeholder change position ( slot/repeater )
                   * Add multiple time.
                   * Remove the old and use last with last parent element.
                   */
                  const itemsFiltered = items.filter(
                      (item) => item.bindProxiId !== bindProxiId
                  );

                  return [
                      ...itemsFiltered,
                      { parentNode: parentElement, bindProxiId },
                  ];
              })()
            : [{ parentNode: parentElement, bindProxiId }];

    bindProxiMap.set(id, itemsUpdated);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindProxiId
 * @returns {void}
 */
export const removeBindProxiByBindProxiId = ({ id, bindProxiId }) => {
    const items = bindProxiMap.get(id);
    const itemsUpdated = items.filter(
        (item) => item.bindProxiId !== bindProxiId
    );
    bindProxiMap.set(id, itemsUpdated);
};

/**
 * @description
 * At the end of parse delete web component and add data to real map
 * New map has componentId as key, so easy to destroy, one map for every bindText in component.
 * We need end of parse to get real parent element ( slot/repeater/invalidate issue ).
 * @returns {void}
 */
export const switchBindProxiMap = () => {
    [...bindProxiPlaceHolderMap].forEach(
        ([placeholder, { componentId, bindProxiId }]) => {
            addBindProxiParent({
                id: componentId,
                bindProxiId,
                parentElement: placeholder.parentElement,
            });

            // @ts-ignore
            placeholder?.removeCustomComponent?.();
            placeholder?.remove();
        }
    );

    bindProxiPlaceHolderMap.clear();
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {void}
 */
export const removeBindProxiParentById = ({ id }) => {
    bindProxiMap.delete(id);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindProxiId
 * @returns {HTMLElement|undefined}
 */
const getParentBindProxi = ({ id, bindProxiId }) => {
    const item = bindProxiMap.get(id);
    if (!item) return;

    const current = item.find((item) => {
        return bindProxiId === item.bindProxiId;
    });

    return current?.parentNode;
};

/**
 * @returns {number}
 */
export const getBindProxiParentSize = () => {
    return [...bindProxiMap].reduce(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (previous, [_, values]) => previous + values.length,
        0
    );
};

/**
 * @returns {number}
 */
export const getBindProxiPlaceholderSize = () => bindProxiPlaceHolderMap.size;

/**
 * @param {string} id
 * @param {string} bindProxiId
 * @param {string[]} keys
 * @param {() => string} render
 * @returns {void}
 */
export const createBindProxiWatcher = (id, bindProxiId, keys, render) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /** @type{WeakRef<HTMLElement>} */
    let ref;

    keys.forEach((state) => {
        const unwatch = watchById(id, state, () => {
            /**
             * Wait for all all props is settled.
             */
            if (watchIsRunning) return;
            watchIsRunning = true;

            mobCore.useNextLoop(() => {
                mobCore.useFrame(() => {
                    if (!ref) {
                        ref = new WeakRef(
                            getParentBindProxi({
                                id,
                                bindProxiId,
                            })
                        );
                        removeBindProxiByBindProxiId({ id, bindProxiId });
                    }

                    if (ref.deref()) {
                        ref.deref().textContent = '';
                        ref.deref().insertAdjacentHTML('afterbegin', render());
                    }

                    watchIsRunning = false;

                    mobCore.useNextTick(async () => {
                        if (!ref.deref()) unwatch();
                    });
                });
            });
        });
    });
};
