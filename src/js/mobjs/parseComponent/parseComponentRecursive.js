// @ts-check

import { setElementById } from '../componentStore/action/element';
import { convertToRealElement } from '../creationStep/convertToRealElement';
import { getComponentList } from '../mainStore/componentList';
// import { removeOrphanComponent } from '../componentStore/action/removeAndDestroy';
import { getDefaultComponent } from '../createComponent';
import { getParseSourceArray } from './utils';
import { fireOnMountCallBack } from '../temporaryData/onMount';
import { applyBindEvents } from '../temporaryData/bindEvents';
import {
    addCurrentIdToDynamicProps,
    applyDynamicProps,
} from '../temporaryData/dynamicProps';
import { decrementParserCounter } from '../temporaryData/parser/parser';
import { inizializeRepeat } from '../temporaryData/repeater/inizialize';
import { getParamsForComponentFunction } from '../creationStep/getParamsForComponent';
import { queryGenericRepeater } from '../query/queryGenericRepeater';
import {
    addParentIdToFutureComponent,
    addSelfIdToParentComponent,
    setParentsIdFallback,
} from '../componentStore/action/parent';
import {
    getRefs,
    getRefsComponent,
    refsComponentToNewElement,
} from '../temporaryData/refs';
import { applyDelegationBindEvent } from '../temporaryData/weakBindEvents';
import { getParamsFromWebComponent } from '../creationStep/getParamsFromWebComponent';
import { addComponentToStore } from '../componentStore/addComponentToStore';
import {
    setIsRepeaterFirstChildNode,
    setRepeaterContext,
    setRepeaterStateById,
} from '../componentStore/action/currentRepeatValue';
import { addRepeatTargetComponent } from '../temporaryData/repeaterTargetComponent';
import { getInvalidateFunctions } from '../componentStore/action/invalidate';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [ obj.isCancellable ]
 * @param {Array<{onMount:Function, fireDynamic:function, fireFirstRepeat:function, fireInvalidateFunction:function}>} [ obj.functionToFireAtTheEnd ]
 * @param {number} [ obj.currentIterationCounter ]
 * @param {Array<import("../webComponent/type").userComponent>} [ obj.currentSelectors ]
 * @param {string} [ obj.parentIdForced ]
 * @return {Promise<void>}
 *
 * @description
 * Create all component from DOM.
 */
export const parseComponentsRecursive = async ({
    element,
    functionToFireAtTheEnd = [],
    isCancellable = true,
    currentIterationCounter = 0,
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
        currentIterationCounter === getDefaultComponent().maxParseIteration;

    if (parseLimitReached)
        console.warn(
            `dom parse reached max parse limit: ${currentIterationCounter}`
        );

    /**
     * If there is no component or parse limit is reached.
     */
    if (!componentToParse || parseLimitReached) {
        /**
         * If all the parser is ended.
         * ( remove active parser and return how many parser is active)
         * Check if there is element in store that is not in real DOM and delete from store
         * When component is deleted delete the nested component too.
         * This is a additional level of security
         */
        const activeParser = decrementParserCounter();
        if (!activeParser) {
            // removeOrphanComponent();
        }

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
                fireDynamic,
                fireFirstRepeat,
                fireInvalidateFunction,
            } = item;
            await onMount();
            fireDynamic();
            fireFirstRepeat();
            fireInvalidateFunction();
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
            isCancellable,
            currentIterationCounter: (currentIterationCounter += 1),
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
        repeaterContextId,
    } = getParamsFromWebComponent({
        element: componentToParse,
        parentIdForced,
    });

    /**
     * Get state from componentParams
     */
    const { state } = componentParams;

    /**
     * Add component to store
     */
    const { getState, setState, emit, emitAsync, computed, watch } =
        addComponentToStore({
            element: componentToParse,
            props,
            state,
            id,
            componentName,
            instanceName,
            key,
            repeatPropBind,
            isCancellable,
            parentId,
            repeaterContextId,
        });

    /**
     * Update Parent id before render, do child can use immediately parentId.
     * This step is necessary only if component come without parentId
     * - In normal mode ( no repeat ) addSelfIdToFutureComponent() assign parent id before render
     * - Repeater coem with parentId 'precompiled'
     *
     *  This is only a fallback.
     */
    setParentsIdFallback({ componentId: id });

    /**
     * Update to parent component child array.
     */
    addSelfIdToParentComponent({ id });

    /**
     * Add component type to repeaterTargetComponentMap
     * So in watch callback of repeater will be filter the right child component.
     * Use the component name of the first repeater child.
     */
    if (componentRepeatId && componentRepeatId !== '') {
        addRepeatTargetComponent({
            repeatId: componentRepeatId,
            repeaterParentId: parentId ?? '',
            targetComponent: componentName,
        });
    }

    /**
     * Is a component inside a repeater.
     * We have the first currentRepeatValue
     */
    const shouldAddCurrentRepeaterValue = currentRepeatValue?.index !== -1;

    /**
     * Set initial currentRepeaterState for initialize dynamicProps.
     * Only first child node of a repeater
     *
     * - update componentMap isRepeaterFirstChildNode
     * - update componentMap currentRepeaterState
     * - update child repeaterContextId
     */
    if (
        shouldAddCurrentRepeaterValue &&
        (!repeaterContextId || repeaterContextId === '')
    ) {
        setIsRepeaterFirstChildNode({ id });
        setRepeaterStateById({ id, value: currentRepeatValue });
        setRepeaterContext({ element: componentToParse, id });
    }

    /**
     * Set initial currentRepeaterState for initialize dynamicProps.
     * Only child of isRepeaterFirstChildNode
     *
     * - update repeaterContextId
     */
    if (
        shouldAddCurrentRepeaterValue &&
        repeaterContextId &&
        repeaterContextId.length > 0
    ) {
        setRepeaterStateById({ id, value: currentRepeatValue });
    }

    /**
     * Initialize dynamic props and
     * set initial state.
     */
    addCurrentIdToDynamicProps({
        propsId: dynamicPropsId,
        repeatPropBind,
        componentId: id,
    });

    addCurrentIdToDynamicProps({
        propsId: dynamicPropsIdFromSlot,
        componentId: id,
    });

    /**
     * Prepare params for component function
     */
    const objectFromComponentFunction = getParamsForComponentFunction({
        getState,
        setState,
        emit,
        emitAsync,
        computed,
        watch,
        id,
        key,
        bindEventsId,
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
    const { newElement } = await convertToRealElement({
        content,
        // @ts-ignore
        element: componentToParse,
    });

    /**
     * copy all classes in new component.
     */
    newElement.classList.add(...classList);

    /**
     * Find all default node refs.
     */
    const refsCollection = newElement ? getRefs(newElement) : {};

    /**
     * Find all component node refs.
     */
    const refsCollectionComponent = newElement
        ? getRefsComponent(newElement)
        : [];

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
        const activeParser = decrementParserCounter();
        if (!activeParser) {
            // removeOrphanComponent();
        }

        return;
    }

    /**
     * Update last DOM element in store.
     */
    setElementById({ id, newElement });

    /**
     * Get all repeat placeholder to check the parent div for each list.
     */
    const repeaterNodeList = queryGenericRepeater(newElement);
    const repeatersParents = [...repeaterNodeList].map((placeholder) => {
        return {
            parent: /** @type {HTMLElement} */ (placeholder.parentNode),
            // @ts-ignore
            id: placeholder.getRepeatId(),
        };
    });

    /**
     * Execute repeat List function
     */
    const repeatIdArray = objectFromComponentFunction?.repeatIdArray;
    const firstRepeatEmitArray = repeatIdArray.map((repeatId) => {
        return inizializeRepeat({
            repeatId,
            repeaterParent: repeatersParents.find(({ id }) => {
                return id === repeatId;
            }),
        });
    });

    /**
     * Execute invalidateFunction.
     */
    const invalidateFunctions = getInvalidateFunctions({ id });

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
            refsCollection,
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
             * Normalize component refs in array like default refs
             */
            const refFromComponent = refsComponentToNewElement(
                refsCollectionComponent
            );

            /**
             * Fire onMount callback at the end of current parse.
             */
            await fireOnMountCallBack({
                id,
                element: newElement,
                refsCollection: { ...refsCollection, ...refFromComponent },
            });
        },
        fireDynamic: () => {
            applyDynamicProps({
                componentId: id,
                repeatPropBind,
                inizilizeWatcher: true,
            });
        },
        fireFirstRepeat:
            firstRepeatEmitArray.length > 0
                ? () => {
                      firstRepeatEmitArray.forEach((fn) => {
                          fn?.();
                      });
                  }
                : () => {},
        fireInvalidateFunction:
            invalidateFunctions.length > 0
                ? () => {
                      invalidateFunctions.forEach(({ fn }) => {
                          fn?.();
                      });
                  }
                : () => {},
    });

    // Check for another component
    await parseComponentsRecursive({
        element,
        functionToFireAtTheEnd,
        isCancellable,
        currentIterationCounter: (currentIterationCounter += 1),
        currentSelectors: parseSourceArray,
        parentIdForced,
    });
};
