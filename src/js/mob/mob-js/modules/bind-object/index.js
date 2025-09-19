import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { watchById } from '../../component/action/watch';
import { invalidateTick } from '../../queque/tick-invalidate';
import { repeaterTick } from '../../queque/tick-repeater';
import { detectProp } from '../../utils';

/** @type {Map<string, import('./type').BindObject[]>} */
export const bindObjectMap = new Map();

/** @type {Map<Element, import('./type').BindObjectPlaceHolder>} */
export const bindObjectPlaceHolderMap = new Map();

/**
 * @param {object} params
 * @param {Element} params.host
 * @param {string} params.componentId
 * @param {string} params.bindObjectId
 * @returns {void}
 */
export const addBindObjectPlaceHolderMap = ({
    host,
    componentId,
    bindObjectId,
}) => {
    bindObjectPlaceHolderMap.set(host, {
        componentId,
        bindObjectId,
    });
};

/**
 * @param {any} values
 * @returns {string[]}
 */
export const getBindObjectKeys = (values) => {
    return values.map(
        (
            /** @type {{ observe?: string | (() => void); value: () => void } | (() => void)} */ item
        ) => {
            /**
             * Get explicit keys or auto ( with proxies ).
             */
            return 'observe' in item
                ? (() => {
                      return detectProp(
                          /** @type{string|(() => any)} */ (item.observe)
                      );
                  })()
                : (() => {
                      MobDetectBindKey.initializeCurrentDependencies();
                      if ('value' in item) {
                          item?.value();
                      } else {
                          /** @type{() => void} */ (item)();
                      }

                      return MobDetectBindKey.getFirstCurrentDependencies();
                  })();
        }
    );
};

/**
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
export const renderBindObject = (strings, ...values) => {
    return strings.raw.reduce((accumulator, currentText, i) => {
        return values?.[i] && 'value' in values[i]
            ? accumulator + currentText + (values?.[i]?.value?.() ?? '')
            : accumulator + currentText + (values?.[i]?.() ?? '');
    }, '');
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindObjectId
 * @param {HTMLElement} params.parentElement
 * @returns {void}
 */
export const addBindObjectParent = ({ id, bindObjectId, parentElement }) => {
    const items = bindObjectMap.get(id);

    const itemsUpdated =
        items && items.length > 0
            ? (() => {
                  /**
                   * When placeholder change position ( slot/repeater ) Add multiple time. Remove the old and use last
                   * with last parent element.
                   */
                  const itemsFiltered = items.filter(
                      (item) => item.bindObjectId !== bindObjectId
                  );

                  return [
                      ...itemsFiltered,
                      { parentNode: parentElement, bindObjectId },
                  ];
              })()
            : [{ parentNode: parentElement, bindObjectId }];

    bindObjectMap.set(id, itemsUpdated);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindObjectId
 * @returns {void}
 */
export const removeBindObjectByBindObjectId = ({ id, bindObjectId }) => {
    const items = bindObjectMap.get(id);
    if (!items) return;

    const itemsUpdated = items.filter(
        (item) => item.bindObjectId !== bindObjectId
    );
    bindObjectMap.set(id, itemsUpdated);
};

/**
 * At the end of parse delete web component and add data to real map New map has componentId as key, so easy to destroy,
 * one map for every bindText in component. We need end of parse to get real parent element ( slot/repeater/invalidate
 * issue ).
 *
 * @returns {void}
 */
export const switchBindObjectMap = () => {
    [...bindObjectPlaceHolderMap].forEach(
        ([placeholder, { componentId, bindObjectId }]) => {
            const parentElement = placeholder.parentElement;
            if (!parentElement) return;

            addBindObjectParent({
                id: componentId,
                bindObjectId,
                parentElement,
            });

            // @ts-ignore
            placeholder?.removeCustomComponent?.();
            placeholder?.remove();
        }
    );

    bindObjectPlaceHolderMap.clear();
};

/**
 * @param {object} params
 * @param {string} params.id
 * @returns {void}
 */
export const removeBindObjectParentById = ({ id }) => {
    bindObjectMap.delete(id);
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindObjectId
 * @returns {HTMLElement | undefined}
 */
const getParentBindObject = ({ id, bindObjectId }) => {
    const item = bindObjectMap.get(id);
    if (!item) return;

    const current = item.find((item) => {
        return bindObjectId === item.bindObjectId;
    });

    return current?.parentNode;
};

/**
 * @returns {number}
 */
export const getBindObjectParentSize = () => {
    return [...bindObjectMap].reduce(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (previous, [_, values]) => previous + values.length,
        0
    );
};

/**
 * @returns {number}
 */
export const getBindObjectPlaceholderSize = () => bindObjectPlaceHolderMap.size;

/**
 * @param {string} id
 * @param {string} bindObjectId
 * @param {string[]} keys
 * @param {() => string} render
 * @returns {void}
 */
export const createBindObjectWatcher = (id, bindObjectId, keys, render) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /** @type {WeakRef<HTMLElement>} */
    let ref;

    const unsubScribeFunction = keys.map((state) => {
        return watchById(id, state, async () => {
            /**
             * Fire after repeater && invalidate Repater proxi must be update after repat update,
             */
            await repeaterTick();
            await invalidateTick();

            /**
             * Wait for all all props is settled.
             */
            if (watchIsRunning) return;
            watchIsRunning = true;

            MobCore.useNextLoop(() => {
                MobCore.useFrame(() => {
                    if (!ref) {
                        let refElement = getParentBindObject({
                            id,
                            bindObjectId,
                        });

                        /**
                         * Skip if refElement is undefined. refElement is settled to null to remove any reference.
                         */
                        if (refElement) {
                            ref = new WeakRef(refElement);
                            removeBindObjectByBindObjectId({
                                id,
                                bindObjectId,
                            });
                            // @ts-ignore
                            refElement = null;
                        }
                    }

                    if (ref && ref?.deref()) {
                        // @ts-ignore
                        ref.deref().textContent = '';
                        // @ts-ignore
                        ref.deref().insertAdjacentHTML('afterbegin', render());
                    }

                    watchIsRunning = false;

                    MobCore.useNextTick(async () => {
                        if (!ref || !ref?.deref()) {
                            unsubScribeFunction.forEach((fn) => {
                                if (fn) fn();
                            });

                            unsubScribeFunction.length = 0;
                        }
                    });
                });
            });
        });
    });
};
