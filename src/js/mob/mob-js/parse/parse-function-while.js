import { setElementById } from '../component/action/element';
import { convertToRealElement } from './steps/convert-to-real-element';
import { getDefaultComponent } from '../component/create-component';
import {
    getCurrentIterationCounter,
    incrementCurrentIterationCounter,
} from './utils';
import { fireOnMountCallBack } from '../modules/on-mount';
import { applyBindEvents } from '../modules/bind-events';
import { addCurrentIdToBindProps, applyBindProps } from '../modules/bind-props';
import { getParamsForComponentFunction } from './steps/get-params-for-component';
import { addSelfIdToParentComponent } from '../component/action/parent';
import { applyDelegationBindEvent } from '../modules/delegate-events';
import { getParamsFromPlaceHolder } from './steps/get-params-from-web-component';
import { addComponentToStore } from '../component';
import {
    setRepeaterInnerWrap,
    setRepeaterStateById,
} from '../component/action/repeater';
import { getInvalidateFunctions } from '../modules/invalidate/action/get/get-invalidate-functions';
import { getRepeatFunctions } from '../modules/repeater/action/get/get-repeat-functions';
import { addBindRefsToComponent, getBindRefs } from '../modules/bind-refs';
import { clearSlotPlaceHolder } from '../modules/slot';
import { useSlotQuery } from './strategy';
import { switchBindTextMap } from '../modules/bind-text';
import { switchBindObjectMap } from '../modules/bind-object';
import {
    applyBindEffect,
    applyBindEffectFromComponent,
} from '../modules/bind-effetc';
import { getComponentList } from '../component/component-list';
import { PARSER_ASYNC_DEFAULT } from '../main-store/constant';
import { getFirstUserChildPlaceHolder } from '../modules/user-component';
import { tagShouldBeComponent } from '../component/component-tag';
import { getParamsFromCustomComponent } from './steps/get-special-params-from-web-component';

/**
 * Create all component from DOM.
 *
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [obj.persistent]
 * @param {string} [obj.source]
 * @returns {Promise<void>}
 */
export const parseComponentsWhile = async ({
    element,
    persistent = false,
    source = PARSER_ASYNC_DEFAULT,
}) => {
    const { debug: debugMode } = getDefaultComponent();
    if (debugMode) console.log('parse source:', source);

    const componentList = getComponentList();

    /**
     * @type {{
     *     onMount: () => Promise<void>;
     *     initializeBindPropsWatcher: () => void;
     *     fireInvalidateFunction: () => void;
     *     fireRepeatFunction: () => void;
     * }[]}
     */
    const functionToFireAtTheEnd = [];

    /** Current component to parse */
    let componentToParse = getFirstUserChildPlaceHolder(element);

    /**
     * Main Loop.
     *
     * In this loop, components are rendered without the browser performing a reflow. The reflow occurs in two specific
     * cases and requires intentional user action to happen.
     *
     * A) UserFunctionComponent: The user function is asynchronous. This can and should only occur at the root node of a
     * page. Its internal components will resolve the asynchronous function in the first available microtask.
     *
     * B) FireOnMountCallBack: The onMount function is asynchronous. This means the component was used as scoped,
     * splitting the rendering flow. It is an option but rarely used, as in the previous example, by default it is
     * resolved in the first available microtask.
     */
    while (componentToParse) {
        /**
         * Get component params from list definition.
         */
        const componentToParseName = componentToParse.getComponentName();
        const userFunctionComponent =
            componentList?.[componentToParseName]?.componentFunction;
        const componentParams =
            componentList?.[componentToParseName]?.componentParams;
        const { scoped, bindStore } = componentParams;

        /**
         * Get all data from placeholder
         */
        const {
            props,
            id,
            componentName,
            instanceName,
            key,
            dynamicPropsId,
            currentRepeatValue,
            bindEventsId,
            parentId,
            componentRepeatId,
            repeatPropBind,
            bindEffectInstanceId,
        } = getParamsFromPlaceHolder({
            element: componentToParse,
        });

        /**
         * Get state from componentParams
         */
        const state = componentParams?.state ?? {};

        /**
         * Add component to store
         */
        const {
            getState,
            setState,
            updateState,
            getProxi,
            emit,
            emitAsync,
            computed,
            watch,
            debug,
        } = addComponentToStore({
            element: componentToParse,
            props,
            state,
            id,
            componentName,
            instanceName,
            key,
            repeatPropBind,
            persistent,
            parentId,
            componentRepeatId,
            bindStore,
        });

        /**
         * Update to parent component child array.
         */
        addSelfIdToParentComponent({ id });

        /**
         * Set initial currentRepeaterState for initialize dynamicProps. Only first child node of a repeater
         *
         * - Update componentMap currentRepeaterState
         * - Update innerwrap
         */
        if (componentRepeatId && componentRepeatId?.length > 0) {
            setRepeaterStateById({ id, value: currentRepeatValue });
            setRepeaterInnerWrap({
                id,
                repeatId: componentRepeatId,
                element: componentToParse,
            });
        }

        /**
         * Initialize dynamic props and set initial state.
         */
        addCurrentIdToBindProps({
            propsId: dynamicPropsId,
            repeatPropBind,
            componentId: id,
        });

        /**
         * Prepare params for component function
         */
        const objectFromComponentFunction = getParamsForComponentFunction({
            getState,
            setState,
            updateState,
            getProxi,
            emit,
            emitAsync,
            computed,
            watch,
            id,
            key,
            bindEventsId,
            debug,
        });

        /**
         * A) Possible reflow id component function use a async function ( eg: a fetch after initialization ).
         *
         * - Launch userFunctionComponent and wait for render function with custom DOM to add to component.
         * - By default component should not return an asynchronous function.
         */
        const content = await userFunctionComponent(
            objectFromComponentFunction
        );

        /**
         * Add custom DOM to basic component
         */
        const { newElement } = convertToRealElement({
            content,
            // @ts-ignore
            element: componentToParse,
        });

        /**
         * If element wad destroyed during parse es: repat function fired with async component to fast return without
         * render dom component.
         */
        if (!newElement) {
            return;
        }

        /**
         * Clean slot map after convertToRealElement
         */
        if (!useSlotQuery) clearSlotPlaceHolder();

        /**
         * Copy all classes in new component.
         */
        const classList = componentToParse.classList;
        if (classList.length > 0) {
            newElement?.classList.add(...classList);
        }

        /**
         * Controlliamo che il DOM riestituito dalla funzione-componente sia un customComponent
         *
         * - Servirá per applicare i moduli special ( come bindEffect ) se applicati al componente
         */
        const shouldBeComponent = tagShouldBeComponent(newElement.tagName);

        /**
         * Una funzione-componente puó restituire un customComponent o un nodo nativo.
         *
         * - GetParamsFromPlaceHolder() é giá stata eseguita.
         * - Moduli come bindEffect se applicati a un customComponent ( non placeHolder ) non vengono intercettati.
         * - ApplyBindEffect(element) con i customComponent non funziona perché:
         * - Si apsetta l'attributo ATTR_BIND_EFFECT
         * - Ma un componente usa ATTR_BIND_EFFECT_INSTANCE a prescindere che sia un placeHolder o no.
         * - Qui intercettiamo i customComponent retituiti dall funzione-componente che usano ATTR_BIND_EFFECT_INSTANCE.
         */
        const { bindEffectInstanceId: bindEffectInstanceIdCC } =
            getParamsFromCustomComponent({
                element:
                    /** @type {import('../web-component/type').UserComponent} */ (
                        newElement
                    ),
                shouldBeComponent,
            });

        /**
         * Applichiamo i moduli `speciali` legati al nuovo DOM restituito dalla funzione
         *
         * - Nodi normnali
         * - Web component
         */
        if (bindEffectInstanceId || bindEffectInstanceIdCC) {
            /**
             * Applichiamo bindEffect al nuovo nodo nativo resituito dalla funzione
             *
             * - L'id é tracciato in getParamsFromPlaceHolder()
             */
            if (bindEffectInstanceId && bindEffectInstanceId?.length > 0) {
                applyBindEffectFromComponent({
                    moduleId: bindEffectInstanceId,
                    target: newElement,
                });
            }

            /**
             * Applichiamo bindEffect al nuovo customComponent resituito dalla funzione
             *
             * - L'id é tracciato in getParamsFromCustomComponent()
             */
            if (bindEffectInstanceIdCC && bindEffectInstanceIdCC.length > 0) {
                applyBindEffectFromComponent({
                    moduleId: bindEffectInstanceIdCC,
                    target: newElement,
                });
            }
        }

        /**
         * Update last DOM element in store.
         */
        setElementById({ id, newElement });

        /**
         * Execute invalidateFunction.
         */
        const invalidateFunctions = getInvalidateFunctions({ id });
        const repeatFunctions = getRepeatFunctions({ id });

        if (bindEventsId) {
            applyBindEvents({
                element: newElement,
                componentId: id,
                bindEventsId,
            });
        }

        /**
         * Fire immediately onMount callback, scoped to current component DOM. Child is ignored.
         */
        const shoulBeScoped = scoped ?? getDefaultComponent().scoped;
        if (shoulBeScoped) {
            /**
             * B) Possible reflow if user use a asynchronous call inside onMount.
             *
             * - By default onMount should not return an asynchronous function.
             */
            await fireOnMountCallBack({
                id,
                element: newElement,
            });
        }

        /**
         * Initialize custom component.
         *
         * #this.#isPlaceholder is disables in convert-to-real-element.js
         */

        // @ts-ignore
        newElement?.inizializeCustomComponent?.(objectFromComponentFunction);

        /**
         * Store onMount callback. Fire : 1 - onMount callback. 2 - Dynamic props. 3 - First repat from current state.
         */
        functionToFireAtTheEnd.push({
            onMount: async () => {
                if (shoulBeScoped) return;

                /**
                 * Fire onMount callback at the end of current parse.
                 */
                await fireOnMountCallBack({
                    id,
                    element: newElement,
                });
            },
            initializeBindPropsWatcher: () => {
                applyBindProps({
                    componentId: id,
                    repeatPropBind,
                    inizilizeWatcher: true,
                });
            },
            fireInvalidateFunction:
                invalidateFunctions.length > 0
                    ? () => {
                          invalidateFunctions.forEach(
                              ({ initializeModule }) => {
                                  initializeModule?.();
                              }
                          );
                      }
                    : () => {},
            fireRepeatFunction:
                repeatFunctions.length > 0
                    ? () => {
                          repeatFunctions.forEach(({ initializeModule }) => {
                              initializeModule?.();
                          });
                      }
                    : () => {},
        });

        componentToParse = getFirstUserChildPlaceHolder(element);

        /**
         * Check if max parse number is reached.
         */
        const parseLimitReached =
            getCurrentIterationCounter() ===
            getDefaultComponent().maxParseIteration;

        incrementCurrentIterationCounter();

        if (parseLimitReached) {
            console.warn(
                `dom parse reached max parse limit: ${getCurrentIterationCounter()}`
            );

            break;
        }
    }

    /*
     * After loop
     */
    /**
     * Get all dynamic refs.
     */
    const bindRefs = getBindRefs({ element });
    if (Object.keys(bindRefs).length > 0) addBindRefsToComponent(bindRefs);

    /**
     * Fire onMount queue. Wait parse is ended to fire onMount callback.
     *
     * Launch from the end so childn can initialize watch before parent. In case a watcher is watching a props
     * initialized inside onMount state of parent.
     */
    for (const item of functionToFireAtTheEnd.toReversed()) {
        const {
            onMount,
            initializeBindPropsWatcher,
            fireInvalidateFunction,
            fireRepeatFunction,
        } = item;

        await onMount();
        fireRepeatFunction();
        fireInvalidateFunction();
        initializeBindPropsWatcher();
    }

    /**
     * Reset reference.
     */
    functionToFireAtTheEnd.length = 0;

    // @ts-expect-error remove component reference for GC.
    componentToParse = null;

    /**
     * Apply delegate event at the ends of all repeater parse. Important! do not use await here. We are inside a
     * repeater queque ! We can not await end of itself ! This should be the last command.
     */
    applyDelegationBindEvent(element);
    applyBindEffect(element);
    switchBindTextMap();
    switchBindObjectMap();

    return;
};
