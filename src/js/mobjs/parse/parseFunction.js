// @ts-check

import { setElementById } from '../component/action/element';
import { convertToRealElement } from './steps/convertToRealElement';
import { getComponentList } from '../component/getComponentList';
import { getDefaultComponent } from '../component/createComponent';
import {
    getCurrentIterationCounter,
    getParseSourceArray,
    incrementCurrentIterationCounter,
} from './utils';
import { fireOnMountCallBack } from '../modules/onMount';
import { applyBindEvents } from '../modules/bindEvents';
import { addCurrentIdToBindProps, applyBindProps } from '../modules/bindProps';
import { getParamsForComponentFunction } from './steps/getParamsForComponent';
import {
    addParentIdToFutureComponent,
    addSelfIdToParentComponent,
} from '../component/action/parent';
import { applyDelegationBindEvent } from '../modules/delegateEvents';
import { getParamsFromWebComponent } from './steps/getParamsFromWebComponent';
import { addComponentToStore } from '../component';
import {
    setRepeaterInnerWrap,
    setRepeaterStateById,
} from '../component/action/repeater';
import { getInvalidateFunctions } from '../modules/invalidate/action/getInvalidateFunctions';
import { getRepeatFunctions } from '../modules/repeater/action/getRepeatFunctions';
import { addBindRefsToComponent, getBindRefs } from '../modules/bindRefs';
import { clearSlotPlaceHolder } from '../modules/slot';
import { useSlotQuery } from './useQuery';
import { switchBindTextMap } from '../modules/bindtext';
import { switchBindObjectMap } from '../modules/bindObject';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [ obj.persistent  ]
 * @param {Array<{onMount:Function, initializeBindPropsWatcher:function, fireInvalidateFunction:function, fireRepeatFunction:function}>} [ obj.functionToFireAtTheEnd ]
 * @param {Array<import("../webComponent/type").UserComponent>} [ obj.currentSelectors ]
 * @param {string} [ obj.parentIdForced ]
 * @param {boolean} [ obj.checkBindRef ]
 * @return {Promise<void>}
 *
 * @description
 * Create all component from DOM.
 */
export const parseComponentsRecursive = async ({
    element,
    functionToFireAtTheEnd = [],
    persistent = false,
    currentSelectors = [],
    parentIdForced = '',
}) => {
    if (!element) return;

    const componentList = getComponentList();

    const { componentToParse, parseSourceArray } = getParseSourceArray({
        element,
        currentSelectors,
    });

    /**
     * Check if max parse number is reached.
     */
    const parseLimitReached =
        getCurrentIterationCounter() ===
        getDefaultComponent().maxParseIteration;

    incrementCurrentIterationCounter();

    if (parseLimitReached)
        console.warn(
            `dom parse reached max parse limit: ${getCurrentIterationCounter()}`
        );

    /**
     * If there is no component or parse limit is reached.
     */
    if (!componentToParse || parseLimitReached) {
        /**
         * Get all dynamic refs.
         */
        const bindRefs = getBindRefs({ element });
        if (Object.keys(bindRefs).length > 0) addBindRefsToComponent(bindRefs);

        /**
         * Fire onMount queue.
         * Wait parse is ended to fire onMount callback.
         *
         * Launch from the end so childn can initialize watch before parent.
         * In case a watcher is watching a props initialized inside
         * onMount state of parent.
         */
        for (const item of functionToFireAtTheEnd.reverse()) {
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
        currentSelectors.length = 0;

        /**
         * Apply delegate event at the ends of all repeater parse.
         * Important! do not use await here. We are inside a repeater queque !
         * We can not await end of itself !
         * This should be the last command.
         */
        applyDelegationBindEvent(element);
        switchBindTextMap();
        switchBindObjectMap();

        return;
    }

    /**
     * Get component params from list definition.
     */
    const componentToParseName = componentToParse.getComponentName();
    const userFunctionComponent =
        componentList?.[componentToParseName]?.componentFunction;
    const componentParams =
        componentList?.[componentToParseName]?.componentParams;
    const { scoped } = componentParams;

    /**
     * If componentToParse is not in list remove div component
     */
    if (!userFunctionComponent) {
        console.warn(`${componentToParseName} component is not registered.`);

        componentToParse.remove();
        await parseComponentsRecursive({
            element,
            functionToFireAtTheEnd,
            persistent,
            currentSelectors: parseSourceArray,
            parentIdForced,
        });

        return;
    }

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
        dynamicPropsIdFromSlot,
        currentRepeatValue,
        bindEventsId,
        parentId,
        componentRepeatId,
        repeatPropBind,
    } = getParamsFromWebComponent({
        element: componentToParse,
        parentIdForced,
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
        bindStore,
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
    });

    /**
     * Update to parent component child array.
     */
    addSelfIdToParentComponent({ id });

    /**
     * Set initial currentRepeaterState for initialize dynamicProps.
     * Only first child node of a repeater
     *
     * - update componentMap currentRepeaterState
     * - update innerwrap
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
     * Initialize dynamic props and
     * set initial state.
     */
    addCurrentIdToBindProps({
        propsId: dynamicPropsId,
        repeatPropBind,
        componentId: id,
    });

    addCurrentIdToBindProps({
        propsId: dynamicPropsIdFromSlot,
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
        bindStore,
    });

    /**
     * Launch userFunctionComponent and wait for render function with custom DOM
     * to add to component.
     */
    const content = await userFunctionComponent(objectFromComponentFunction);

    /**
     * Get all classes from placeholder component
     */
    const classList = componentToParse.classList;

    /**
     * Add custom DOM to basic component
     */
    const { newElement } = convertToRealElement({
        content,
        // @ts-ignore
        element: componentToParse,
    });

    /**
     * Clean slot map after convertToRealElement
     */
    if (!useSlotQuery) clearSlotPlaceHolder();

    /**
     * copy all classes in new component.
     */
    newElement?.classList.add(...classList);

    /**
     * Set parentId to component inside current.
     * Add self id to future component.
     * If id is assigned to component nested in next cycle will be override by current component.
     */
    addParentIdToFutureComponent({ element: newElement, id });

    /**
     * If element wad destroyed during parse
     * es: repat function fired with async component to fast
     * return without render dom component.
     */
    if (!newElement) {
        return;
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

    // const bindEventsId = objectFromComponentFunction?.bindEventsId;
    if (bindEventsId) {
        applyBindEvents({
            element: newElement,
            componentId: id,
            bindEventsId,
        });
    }

    /**
     * Fire immediately onMount callback, scoped to current component DOM.
     * Child is ignored.
     */
    const shoulBeScoped = scoped ?? getDefaultComponent().scoped;

    if (shoulBeScoped) {
        await fireOnMountCallBack({
            id,
            element: newElement,
        });
    }

    /**
     * Initialize custom component.
     */
    // @ts-ignore
    newElement?.inizializeCustomComponent?.(objectFromComponentFunction);

    /**
     * Store onMount callback.
     * Fire :
     * 1 - onMount callback.
     * 2 - Dynamic props.
     * 3 - First repat from current state.
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
                      invalidateFunctions.forEach(({ fn }) => {
                          fn?.();
                      });
                  }
                : () => {},
        fireRepeatFunction:
            repeatFunctions.length > 0
                ? () => {
                      repeatFunctions.forEach(({ fn }) => {
                          fn?.();
                      });
                  }
                : () => {},
    });

    // Check for another component
    await parseComponentsRecursive({
        element,
        functionToFireAtTheEnd,
        persistent,
        currentSelectors: parseSourceArray,
        parentIdForced,
    });
};
