//@ts-check

import { MobCore } from '../../../mob-core';
import { getStateById } from '../../component/action/state/get-state-by-id';
import { watchById } from '../../component/action/watch';

/**
 * Mappa usata per abbinare id component e id `istanta` del singolo modulo.
 *
 * @type {Map<string, import('./type').BindText[]>}
 */
export const bindTextMap = new Map();

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
 * Aggiungiamo il placeholder Element che il webComponent a indivuato nella bindTextMap.
 *
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
                   * When placeholder change position ( slot/repeater ) Add multiple time. Remove the old and use last
                   * with last parent element.
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
 * Rimuoviamo la referenza usando bindTextId.
 *
 * - Questo avviene quando il watcher non trova piu l'elemento target perche e stato rimosso dal DOM.
 * - Rimuoviamo solo lo specifico watcher non tutti i watcher legati al componente.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindTextId
 * @returns {void}
 */
export const removeBindTextByBindTextId = ({ id, bindTextId }) => {
    const items = bindTextMap.get(id);
    if (!items) return;

    const itemsUpdated = items.filter((item) => item.bindTextId !== bindTextId);
    bindTextMap.set(id, itemsUpdated);
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
    [...bindTextPlaceHolderMap].forEach(
        ([placeholder, { componentId, bindTextId }]) => {
            /**
             * Individuiamo il div che sara da aggiornare.
             */
            const parentElement = placeholder.parentElement;
            if (!parentElement) return;

            /**
             * Aggiungiamo il placeholder Element che il webComponent a indivuato nella bindTextMap.
             */
            addBindTextParent({
                id: componentId,
                bindTextId,
                parentElement,
            });

            // @ts-ignore
            placeholder?.removeCustomComponent?.();

            /**
             * Elininamiamo il placeholder webComponent.
             */
            placeholder?.remove();
        }
    );

    /**
     * Ripuliamo bindTextPlaceHolderMap.
     *
     * - La funzione di parse e stata completata
     */
    bindTextPlaceHolderMap.clear();
};

/**
 * Rimuoviamo la referrenza usando componentId.
 *
 * - Questo avviene quando il componente viene distrutto.
 * - In questo caso tutti i watcher vanno rimossi.
 * - In realta sitiamo solo la mappa i watcher vengono distrutti insieme allo statao.
 *
 * @param {object} params
 * @param {string} params.id
 * @returns {void}
 */
export const removeBindTextParentById = ({ id }) => {
    bindTextMap.delete(id);
};

/**
 * Alla prima chiamata dalla funzione di watch resitutiamo il parent Element da usare come target.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.bindTextId
 * @returns {HTMLElement | undefined}
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
 * Utils.
 *
 * @returns {number}
 */
export const getBindTextParentSize = () => {
    return [...bindTextMap].reduce(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (previous, [_, values]) => previous + values.length,
        0
    );
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

    /** @type {WeakRef<HTMLElement>} */
    let ref;

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

        return watchById(id, finalStateTowatch, () => {
            /**
             * Wait for all all props is settled.
             */
            if (watchIsRunning) return;
            watchIsRunning = true;

            MobCore.useNextLoop(() => {
                MobCore.useFrame(() => {
                    if (!ref) {
                        let refElement = getParentBindText({
                            id,
                            bindTextId,
                        });

                        /**
                         * Skip if refElement is undefined. refElement is settled to null to remove any reference.
                         */
                        if (refElement) {
                            ref = new WeakRef(refElement);
                            removeBindTextByBindTextId({ id, bindTextId });
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
