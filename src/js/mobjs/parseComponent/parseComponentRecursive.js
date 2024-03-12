// @ts-check

import { setElementById } from '../componentStore/action/element';
import { convertToRealElement } from '../creationStep/convertToRealElement';
import { getComponentList } from '../mainStore/componentList';
// import { removeOrphanComponent } from '../componentStore/action/removeAndDestroy';
import { getDefaultComponent } from '../createComponent';
import { getParseSourceArray } from './utils';
import { executeFireOnMountCallBack } from '../temporaryData/onMount';
import { applyBindEvents } from '../temporaryData/bindEvents';
import { applyDynamicProps } from '../temporaryData/dynamicProps';
import { decrementParserCounter } from '../temporaryData/parser/parser';
import { inizializeRepeat } from '../temporaryData/repeater/inizialize';
import { getParamsForComponentFunction } from '../creationStep/getParamsForComponent';
import { queryGenericRepeater } from '../query/queryGenericRepeater';
import { addSelfIdToFutureComponent } from '../componentStore/action/parent';
import { getRefs } from '../temporaryData/refs';
import { applyDelegationBindEvent } from '../temporaryData/weakBindEvents';
import { getParamsFromWebComponent } from '../creationStep/getParamsFromWebComponent';
import { addComponentToStore } from '../componentStore/addComponentToStore';

/**
 * @param {object} obj
 * @param {HTMLElement} obj.element
 * @param {boolean} [ obj.isCancellable ]
 * @param {Array<{onMount:Function, fireDynamic:function, fireFirstRepeat:function}>} [ obj.functionToFireAtTheEnd ]
 * @param {number} [ obj.currentIterationCounter ]
 * @param {Array<Element>} [ obj.currentSelectors ]
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
            const { onMount, fireDynamic, fireFirstRepeat } = item;
            await onMount();
            fireDynamic();
            fireFirstRepeat();
        }

        /**
         * Reset reference.
         */
        functionToFireAtTheEnd.length = 0;
        currentSelectors.length = 0;

        applyDelegationBindEvent(element);

        return;
    }

    /**
     * Get component params from list definition.
     */
    // @ts-ignore
    const componentToParseName = componentToParse?.getComponentName();
    const userFunctionComponent =
        componentList?.[componentToParseName]?.componentFunction;
    const componentParams =
        componentList?.[componentToParseName]?.componentParams;
    const { isolateOnMount, isolateCreation, scoped } = componentParams;

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
    } = getParamsFromWebComponent({
        // @ts-ignore
        element: componentToParse,
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
            // @ts-ignore
            element: componentToParse,
            props,
            state,
            id,
            componentName,
            instanceName,
            key,
            isCancellable,
            parentId,
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
        dynamicPropsId,
        dynamicPropsIdFromSlot,
        currentRepeatValue,
        bindEventsId,
    });

    /**
     * Launch userFunctionComponent and wait for render function with custom DOM
     * to add to component.
     */
    const content = await userFunctionComponent(objectFromComponentFunction);

    /**
     * Add custom DOM to basic component
     */
    const { newElement } = await convertToRealElement({
        content,
        // @ts-ignore
        element: componentToParse,
        isolateCreation,
    });

    /**
     * Find all refs.
     */
    const refsCollection = newElement ? getRefs(newElement) : {};

    /**
     * Add self id to future component.
     * If id is assigned to component nested in next cycle will be override.
     */
    addSelfIdToFutureComponent({ element: newElement, id });

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

    const scopedParsed = scoped ?? getDefaultComponent().scoped;

    if (scopedParsed) {
        await executeFireOnMountCallBack({
            isolateOnMount,
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
            if (scopedParsed) return;

            /**
             * Fire onMount callback at the end of current parse.
             */
            await executeFireOnMountCallBack({
                isolateOnMount,
                id,
                element: newElement,
                refsCollection,
            });
        },
        fireDynamic: () => {
            applyDynamicProps({ componentId: id, inizilizeWatcher: true });
        },
        fireFirstRepeat:
            firstRepeatEmitArray.length > 0
                ? () => {
                      firstRepeatEmitArray.forEach((fn) => {
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
    });
};
