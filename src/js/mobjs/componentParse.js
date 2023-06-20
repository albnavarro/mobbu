// @ts-check

import { setElementById } from './componentStore/action/element';
import { convertToRealElement } from './creationStep/convertToRealElement';
import { registerGenericElement } from './creationStep/registerGenericElement';
import { fireOnMountCallBack } from './mainStore/actions/onMount';
import {
    incrementParserCounter,
    decrementParserCounter,
} from './mainStore/actions/parser';
import { removeOrphansPropsFromParent } from './mainStore/actions/props';
import { inizializeRepeat } from './mainStore/actions/repeat';
import {
    frameDelayAfterParse,
    IS_COMPONENT,
    IS_RUNTIME,
    WILL_COMPONENT,
} from './constant';
import {
    getComponentsReference,
    getSelectorDefaultTag,
    selectorDefault,
} from './utils';
import { getComponentList } from './mainStore/actions/componentList';
import { core } from '../mobbu';
import { removeOrphanComponent } from './componentStore/action/removeAndDestroy';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @param {string|null} obj.runtimeId
 * @param {Array.<Function>} [ obj.onMountQueque ]
 * @return {Promise<void>}
 *
 * @description
 * Create all component from DOM.
 */
const parseComponentsRecursive = async ({
    element,
    runtimeId,
    onMountQueque = [],
}) => {
    if (!element) return Promise.resolve();

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
     * Select [data-component][is-runtime='<hash>']:not[data-iscomponent]
     */
    const selectoreRuntime = `[${WILL_COMPONENT}][${IS_RUNTIME}="${runtimeId}"]:not([${IS_COMPONENT}])`;

    /**
     * Select runtiem component by tagname.
     * Select <component name>[is-runtime='<hash>']:not[data-iscomponent]
     */
    const selectoreRuntimeTag = Object.values(componentsReference)
        .map((value) => {
            return `${value}[${IS_RUNTIME}="${runtimeId}"]:not([${IS_COMPONENT}])`;
        })
        .join(', ');

    /**
     * @type {Array.<HTMLElement>} componentToParseArray
     */
    const componentToParseArray = /** @type {Array.<HTMLElement>} */ (
        !runtimeId
            ? [
                  ...element.querySelectorAll(
                      `${selectorDefault}, ${selectorDefaultTag}`
                  ),
              ]
            : [
                  ...element.querySelectorAll(
                      `${selectoreRuntime}, ${selectoreRuntimeTag}`
                  ),
              ]
    );

    /**
     * @type {HTMLElement} componentToParse
     *
     * Get first item.
     */
    const componentToParse = componentToParseArray?.[0];

    /**
     * If there is no component end.
     */
    if (!componentToParse) {
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
            removeOrphanComponent();
        }
        /**
         * Fire onMount queue.
         * Wait parse is ended to fire onMount callback.
         * Wait 5 frames, so browser can clear gargbage collector created in parse step.
         */
        core.useFrameIndex(() => {
            core.useNextTick(() => {
                onMountQueque.forEach((fn) => fn());
            });
        }, frameDelayAfterParse);

        return Promise.resolve();
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

    /**
     * If componentToParse is not in list remove div component
     */
    if (!userFunctionComponent) {
        console.warn(`${key} component is not registered.`);

        componentToParse.remove();
        await parseComponentsRecursive({
            element,
            runtimeId,
            onMountQueque,
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
    });

    /**
     * If element wad destroyed during parse
     * es: repat function fired with async component to fast
     * return without render dom component.
     */
    if (!newElement) return Promise.resolve();

    /**
     * Update last DOM element in store.
     */
    setElementById({ id, newElement });

    /**
     * Get all repeat placholder to check the parent div for each list.
     */
    const placeholdreList = /** @type{NodeListOf.<HTMLElement>} */ (
        newElement.querySelectorAll('[data-repeatid]')
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
    repeatIdArray.forEach((repeatId) => {
        inizializeRepeat({
            repeatId,
            placeholderListObj,
        });
    });

    /**
     * Store onMount callback.
     * Fire all onMount at the end of the current parse.
     */
    onMountQueque.push(() => fireOnMountCallBack({ id, element: newElement }));

    // Check for another component
    await parseComponentsRecursive({
        element,
        runtimeId,
        onMountQueque,
    });
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * @param {string|null} [ obj.runtimeId ]
 * @return {Promise<void>} A promise to the token.
 *
 * @description
 */
export const parseComponents = async ({ element, runtimeId = null }) => {
    incrementParserCounter();

    await parseComponentsRecursive({
        element,
        runtimeId,
    });
};
