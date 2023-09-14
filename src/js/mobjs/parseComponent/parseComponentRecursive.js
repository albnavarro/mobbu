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
import {
    ATTR_IS_COMPONENT,
    ATTR_IS_RUNTIME,
    ATTR_REPEATID,
    ATTR_WILL_COMPONENT,
    UNSET,
} from '../constant';
import {
    findComponentToParse,
    getComponentsReference,
    getSelectorDefaultTag,
    selectorDefault,
} from '../utils';
import { getComponentList } from '../mainStore/actions/componentList';
import { removeOrphanComponent } from '../componentStore/action/removeAndDestroy';
import {
    applyBindEvents,
    removeOrphansBindEvent,
} from '../mainStore/actions/bindEvents';
import { getDefaultComponent } from '../createComponent';

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
}) => {
    if (!element) return;

    const componentsReference = getComponentsReference();
    const selectorDefaultTag = getSelectorDefaultTag();
    const componentList = getComponentList();

    /**
     * Get the first data-component element.
     * So after we cna render the child component.
     * render components form top to botton so we are shure that child component
     * can watch parent
     *
     * - ExcludeRuntime is true when load entire route.
     *
     * - For specific situoation es: updatelist, render only the component generated
     *   in current action filtered by a unique id
     */

    /**
     * Runtime deafult
     * Select [data-component][is-runtime='<hash>']:not[data-mobjs]
     */
    const selectoreRuntime = [
        `[${ATTR_WILL_COMPONENT}][${ATTR_IS_RUNTIME}="${runtimeId}"]:not([${ATTR_IS_COMPONENT}])`,
    ];

    /**
     * Select runtiem component by tagname.
     * Select <component name>[is-runtime='<hash>']:not[data-mobjs]
     */
    const selectoreRuntimeTag = Object.values(componentsReference).map(
        (value) => {
            return `${value}[${ATTR_IS_RUNTIME}="${runtimeId}"]:not([${ATTR_IS_COMPONENT}])`;
        }
    );

    /**
     * @type {Array<String>}
     */
    const componentToParseArray = runtimeId
        ? [...selectoreRuntime, ...selectoreRuntimeTag]
        : [...selectorDefault, ...selectorDefaultTag];

    /**
     * @type {HTMLElement|null}
     */
    const componentToParse = findComponentToParse(
        componentToParseArray,
        element
    );

    const parseLimitReached =
        currentIterationCounter === getDefaultComponent().maxParseIteration;

    if (parseLimitReached)
        console.warn(
            `dom parse reached max parse limit: ${currentIterationCounter}`
        );

    /**
     * If there is no component end.
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
    });
};
