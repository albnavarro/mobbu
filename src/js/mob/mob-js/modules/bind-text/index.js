import { MobCore } from '../../../mob-core';
import { getStateById } from '../../component/action/state/get-state-by-id';
import { watchById } from '../../component/action/watch';
import { invalidateTick } from '../../queque/tick-invalidate';
import { repeaterTick } from '../../queque/tick-repeater';

/**
 * Collect all future module to initialize at the end of parse.
 *
 * - Modules will initialize in switchBindTextMap
 *
 * @type {Map<string, import('./type').BindTextToInitialize>}
 */
const bindTextToInitializeMap = new Map();

/**
 * Add all future module to initialize at the end of parse.
 *
 * @param {String} bindTextId
 * @param {import('./type').BindTextToInitialize} params
 */
export const addBindTextToInitialzie = (bindTextId, params) => {
    bindTextToInitializeMap.set(bindTextId, params);
};

/**
 * Mappa usata dal webComponent per tracciare il parent element.
 *
 * @type {Map<Element, import('./type').BindTextPlaceHolder>}
 */
export const bindTextPlaceHolderMap = new Map();

/**
 * Funzione usata dal webComponent per passare l' host.
 *
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
 * Check if there is square brackets in a string with value eg. [0]
 *
 * @param {string} value
 * @returns {RegExpMatchArray | null}
 */
const arrayValuesFromProp = (value) => value.match(/(?<=\[).+?(?=])/g);

/**
 * Split string until first square [ and return strign before [
 *
 * @param {string} value
 * @returns {string}
 */
const splitPropUntilSquare = (value) => value.split('[')?.[0];

/**
 * @param {object} params
 * @param {{ [x: string]: any }} params.previous
 * @param {string} params.current
 * @returns {any[]}
 */
const parsePropValue = ({ previous, current }) => {
    const arrayValues = arrayValuesFromProp(current);
    const isArray = arrayValues && arrayValues?.length > 0;

    return isArray
        ? arrayValues.reduce(
              (accumulator, currentProp) => accumulator?.[currentProp],
              previous[splitPropUntilSquare(current)]
          )
        : previous?.[current];
};

/**
 * @param {string} id - ComponentId
 * @param {TemplateStringsArray} strings
 * @param {any[]} values
 * @returns {string}
 */
export const renderBindText = (id, strings, ...values) => {
    const props = getStateById(id);

    const states = values.map((prop) => {
        /**
         * Get value if prop is: bindText`${'obj.prop1.prop2'}`
         */
        const propsToArray = prop.split('.');
        return propsToArray.reduce(
            (
                /** @type {{ [x: string]: any }} */ previous,
                /** @type {string} */ current
            ) => {
                /**
                 * Return prop value or array value
                 */
                const finalPropValue = parsePropValue({ previous, current });
                return finalPropValue ?? previous;
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
 * At the end of parse delete web component and add data to real map
 *
 * - Is called from parseComponentsWhile.
 * - Event there is no component ( es repeater without camponent ) parse function is called by eg: repeater or invalidate.
 * - New map has componentId as key, so easy to destroy, one map for every bindText in component.
 * - We need end of parse to get real parent element ( slot/repeater/invalidate issue ).
 *
 * @returns {void}
 */
export const switchBindTextMap = () => {
    [...bindTextPlaceHolderMap].forEach(([placeholder, { bindTextId }]) => {
        /**
         * Individuiamo il div che sara da aggiornare.
         */
        let parentElement = placeholder.parentElement;
        if (!parentElement) {
            bindTextToInitializeMap.delete(bindTextId);
            return;
        }

        const item = bindTextToInitializeMap.get(bindTextId);
        if (!item) return;

        bindTextToInitializeMap.delete(bindTextId);
        createBindTextWatcher({ ...item, element: parentElement });

        // @ts-ignore
        placeholder?.removeCustomComponent?.();
        placeholder?.remove();
        parentElement = null;
    });

    /**
     * Clean placeHolder map
     *
     * - Parse function is completed
     */
    bindTextPlaceHolderMap.clear();
};

/**
 * Utils.
 *
 * @returns {number}
 */
export const getBindTextPlaceholderSize = () => bindTextPlaceHolderMap.size;

/**
 * Main function.
 *
 * @type {import('./type').BindTextWatcher}
 */
const createBindTextWatcher = ({ id, render, props, element }) => {
    /**
     * Watch props on change
     */
    let watchIsRunning = false;

    /** @type {WeakRef<HTMLElement>} */
    const ref = new WeakRef(element);

    const unsubScribeFunction = props.map((state) => {
        /**
         * Get state to watch if prop is: bindText`${'myProps.prop1.prop2'}` Get first prop
         */
        const propsToArray = state.split('.');
        const stateToWatch = propsToArray?.[0];

        // props is link myProps[0]
        const arrayValues = arrayValuesFromProp(stateToWatch);

        // prop is array
        const isArray = arrayValues && arrayValues?.length > 0;

        // in case of myProps[0] watch only myprops
        const finalStateTowatch = isArray
            ? splitPropUntilSquare(stateToWatch)
            : stateToWatch;

        if (!finalStateTowatch) return;

        return watchById(id, finalStateTowatch, async () => {
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
