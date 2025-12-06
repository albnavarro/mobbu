import { MobCore, MobDetectBindKey } from '../../../mob-core';
import { watchById } from '../../component/action/watch';
import { invalidateTick } from '../../queque/tick-invalidate';
import { repeaterTick } from '../../queque/tick-repeater';
import { getInvalidateObservedByComponentid } from '../invalidate/action/get-invalidate-observed-by-component-id';
import { getRepeaterObservedByComponentid } from '../repeater/action/get-repeater-observed-by-component-id';

/**
 * Collect all future module to initialize at the end of parse.
 *
 * - Modules will initialize in switchBindObjectMap
 *
 * @type {Map<string, import('./type').BindObectToInitialize>}
 */
const bindObjectToInitializeMap = new Map();

/**
 * Add all future module to initialize at the end of parse.
 *
 * @param {String} bindObjectId
 * @param {import('./type').BindObectToInitialize} params
 */
export const addBindObjectToInitialzie = (bindObjectId, params) => {
    bindObjectToInitializeMap.set(bindObjectId, params);
};

/**
 * Mappa usata dal webComponent per tracciare il parent element.
 *
 * @type {Map<Element, import('./type').BindObjectPlaceHolder>}
 */
export const bindObjectPlaceHolderMap = new Map();

/**
 * Funzione usata dal webComponent per passare l' host.
 *
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
                      return MobDetectBindKey.extractkeyFromProp(
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
 * At the end of parse delete web component and add data to real map
 *
 * - Is called from parseComponentsWhile.
 * - Event there is no component ( es repeater without camponent ) parse function is called by eg: repeater or invalidate.
 * - New map has componentId as key, so easy to destroy, one map for every bindText in component.
 * - We need end of parse to get real parent element ( slot/repeater/invalidate issue ).
 *
 * @returns {void}
 */
export const switchBindObjectMap = () => {
    [...bindObjectPlaceHolderMap].forEach(([placeholder, { bindObjectId }]) => {
        /**
         * Individuiamo il div che sara da aggiornare.
         */
        let parentElement = placeholder.parentElement;
        if (!parentElement) {
            bindObjectToInitializeMap.delete(bindObjectId);
            return;
        }

        const item = bindObjectToInitializeMap.get(bindObjectId);
        if (!item) return;

        bindObjectToInitializeMap.delete(bindObjectId);
        createBindObjectWatcher({ ...item, element: parentElement });

        // @ts-ignore
        placeholder?.removeCustomComponent?.();
        placeholder?.remove();
        parentElement = null;
    });

    /**
     * Clean placeHolder map && module to initialize Set.
     *
     * - Parse function is completed
     */
    bindObjectPlaceHolderMap.clear();
};

/**
 * @type {import('./type').BindObjectWatcher}
 */
const createBindObjectWatcher = ({ id, keys, render, element }) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /** @type {WeakRef<HTMLElement>} */
    const ref = new WeakRef(element);

    /**
     * Merge keys with repater/invalidate key if scope component use it.
     *
     * - Need when dom element is inside repearter/invalidate
     * - Unsubscribe module when DOM element is removed
     * - Sure, track modulo outside repeater/invalidate too, but is a light overload.
     */
    const repeaterObserved = getRepeaterObservedByComponentid({ id });
    const invalidateObserved = getInvalidateObservedByComponentid({ id });
    const keysParsed = [
        ...new Set([...keys, ...repeaterObserved, ...invalidateObserved]),
    ];

    const unsubScribeFunction = keysParsed.map((state) => {
        return watchById(id, state, async () => {
            /**
             * BindEffect/BindText/BindObject is scheduled after repeat/invalidate.
             *
             * - TODO: ebnable only for modulo inside repeater or invalidate ?
             * - Pros & cons ?
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
                    /**
                     * - Unsubscribe module if element is disconnected from DOM.
                     */
                    if (ref.deref() && !ref.deref()?.isConnected) {
                        unsubScribeFunction.forEach((fn) => {
                            if (fn) fn();
                        });

                        unsubScribeFunction.length = 0;
                    }

                    /**
                     * - Update DOM.
                     */
                    if (ref.deref() && ref.deref()?.isConnected) {
                        // @ts-ignore
                        ref.deref().textContent = '';
                        // @ts-ignore
                        ref.deref().insertAdjacentHTML('afterbegin', render());
                    }

                    watchIsRunning = false;
                });
            });
        });
    });
};
