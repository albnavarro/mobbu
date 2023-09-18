// @ts-check

import { setElementById } from '../componentStore/action/element';
import { convertToRealElement } from '../creationStep/convertToRealElement';
import { registerGenericElement } from '../creationStep/registerGenericElement';
import { executeFireOnMountCallBack } from '../mainStore/actions/onMount';
import { decrementParserCounter } from '../mainStore/actions/parser';
import {
    applyDynamicProps,
    clearOrphansDynamicPropsFromSlot,
    removeOrphansPropsFromParent,
} from '../mainStore/actions/props';
import { inizializeRepeat } from '../mainStore/actions/repeat';
import { ATTR_REPEATID, UNSET } from '../constant';
import {
    getComponentsReference,
    getSelectorDefaultTag,
    getSelectorRuntimeTag,
} from '../utils';
import { getComponentList } from '../mainStore/actions/componentList';
import { removeOrphanComponent } from '../componentStore/action/removeAndDestroy';
import {
    applyBindEvents,
    removeOrphansBindEvent,
} from '../mainStore/actions/bindEvents';
import { getDefaultComponent } from '../createComponent';
import { customSelctorAll } from './customSelector.js';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @param {string|null} obj.runtimeId
 * @param {Boolean} [ obj.isCancellable ]
 * @param {Array<{onMount:Function, fireDynamic:function, fireFirstRepeat:Function}>} [ obj.functionToFireAtTheEnd ]
 * @param {Number} [ obj.currentIterationCounter ]
 * @return {Promise<void>}
 *
 * @description
 * Create all component from DOM.
 */
export const parseComponentsRecursive = async ({
    element,
    runtimeId,
    functionToFireAtTheEnd = [],
    isCancellable = true,
    currentIterationCounter = 0,
    currentSelectiors = [],
}) => {
    if (!element) return;

    const useCustomTraversal = getDefaultComponent().customTraversal;
    const componentsReference = getComponentsReference();
    const componentList = getComponentList();
    const selector = runtimeId
        ? getSelectorRuntimeTag(runtimeId)
        : getSelectorDefaultTag();

    /**
     * @description
     * Get the first component.
     * Render components form top to botton so we are shure that child component
     * can watch parent
     *
     * - ExcludeRuntime is true when load entire route.
     *
     * - For specific situoation es: updatelist, render only the component generated
     *   in current action filtered by a unique id
     *
     * @type {NodeListOf<HTMLElement>|Array<HTMLElement>} componentToParseArray
     */

    let parseSourceArray = [];
    let componentToParse = undefined;

    if (currentSelectiors.length > 0) {
        componentToParse = currentSelectiors[0];
        parseSourceArray = currentSelectiors.slice(1);
    } else {
        const query = [...element.querySelectorAll(selector)];
        componentToParse = query?.[0];
        parseSourceArray = query.slice(1);
    }

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
            removeOrphansPropsFromParent();
            removeOrphansBindEvent();
            removeOrphanComponent();
            clearOrphansDynamicPropsFromSlot();
        }

        /**
         * Fire onMount queue.
         * Wait parse is ended to fire onMount callback.
         */
        for (const item of functionToFireAtTheEnd) {
            const { onMount, fireDynamic, fireFirstRepeat } = item;
            await onMount();
            fireDynamic();
            fireFirstRepeat();
        }

        return;
    }

    /**
     * If component is selected by tagname add data-component="<component name>"
     */
    const hasDataComponent = componentToParse?.dataset?.component;
    if (!hasDataComponent)
        componentToParse.dataset.component =
            componentsReference[componentToParse.tagName];

    /**
     * Get component params from list definition.
     */
    const key = componentToParse?.dataset?.component ?? '';
    const userFunctionComponent = componentList?.[key]?.componentFunction;
    const componentParams = componentList?.[key]?.componentParams;
    const { isolateOnMount, isolateCreation, scoped } = componentParams;

    /**
     * If componentToParse is not in list remove div component
     */
    if (!userFunctionComponent) {
        console.warn(`${key} component is not registered.`);

        componentToParse.remove();
        await parseComponentsRecursive({
            element,
            runtimeId,
            functionToFireAtTheEnd,
            isCancellable,
            currentIterationCounter: (currentIterationCounter += 1),
            currentSelectiors: parseSourceArray,
        });

        return;
    }

    /**
     * 1 - Create basic DOM element
     * 2 - Register component to store
     * 3 - Return methods and props for userFunctionComponent (componentData)
     */
    const componentData = registerGenericElement({
        component: componentToParse,
        ...componentParams,
        isCancellable,
    });

    /**
     * Lauch userFunctionComponent and wait for render function wirh custom DOM
     * to add to component.
     */
    const { content, placeholderElement, id } = await userFunctionComponent(
        componentData
    );

    /**
     * Add custom DOM to basic component
     */
    const { newElement } = await convertToRealElement({
        content,
        placeholderElement,
        isolateCreation,
    });

    /**
     * If element wad destroyed during parse
     * es: repat function fired with async component to fast
     * return without render dom component.
     */
    if (!newElement) {
        const activeParser = decrementParserCounter();
        if (!activeParser) {
            removeOrphansPropsFromParent();
            removeOrphansBindEvent();
            removeOrphanComponent();
            clearOrphansDynamicPropsFromSlot();
        }

        return;
    }

    /**
     * Update last DOM element in store.
     */
    setElementById({ id, newElement });

    /**
     * Get all repeat placholder to check the parent div for each list.
     */
    const placeholdreList = /** @type{NodeListOf.<HTMLElement>} */ (
        newElement.querySelectorAll(`[${ATTR_REPEATID}]`)
    );

    const placeholderListObj = [...placeholdreList].map((placeholder) => {
        const { repeatid: id } = placeholder.dataset;
        return {
            parent: /** @type {HTMLElement} */ (placeholder.parentNode),
            id,
        };
    });

    /**
     * Execute repeat List function
     */
    const repeatIdArray = componentData?.repeatId;
    const firstRepeatEmitArray = repeatIdArray.map((repeatId) => {
        return inizializeRepeat({
            repeatId,
            placeholderListObj,
        });
    });

    const bindEventsId = componentData?.bindEventsId;
    if (bindEventsId) {
        applyBindEvents({
            element: newElement,
            componentId: id,
            bindEventsId,
        });
    }

    /**
     * Fire immediatly onMount callback, scoped to current component DOM.
     * Child is ignored.
     */

    const scopedParsed =
        scoped === UNSET ? getDefaultComponent().scoped : scoped;

    if (scopedParsed)
        await executeFireOnMountCallBack({
            isolateOnMount,
            id,
            element: newElement,
        });

    /**
     * Inizialize custom component.
     */
    // @ts-ignore
    newElement?.inizializeCustomComponent?.(componentData);

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
        runtimeId,
        functionToFireAtTheEnd,
        isCancellable,
        currentIterationCounter: (currentIterationCounter += 1),
        currentSelectiors: parseSourceArray,
    });
};
