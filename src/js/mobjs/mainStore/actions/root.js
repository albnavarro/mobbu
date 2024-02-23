// @ts-check

import {
    MAIN_STORE_BEFORE_PAGE_TRANSITION,
    MAIN_STORE_CONTENT_ID,
    MAIN_STORE_PAGE_TRANSITION,
    MAIN_STORE_ROOT_ELEMENT,
} from '../constant';
import { mainStore } from '../mainStore';

/**
 * @param {Object} obj
 * @param {String} obj.contentId
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setContentId = ({ contentId = '' }) => {
    mainStore.set(MAIN_STORE_CONTENT_ID, contentId);
};

/**
 * @returns { HTMLElement }
 *
 * @description
 * Set root app.
 */
export const getContentId = () => {
    const { contentId } = mainStore.get();
    return contentId;
};

/**
 * @returns { HTMLElement }
 *
 * @description
 * Set root app.
 */
export const getRoot = () => {
    const { rootElement } = mainStore.get();
    return rootElement;
};

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.element
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setRoot = ({ element }) => {
    mainStore.set(MAIN_STORE_ROOT_ELEMENT, element);
};

/**
 * @param {Object} obj
 * @param {((arg0:{oldNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)} [ obj.fn ]
 * returns void
 *
 *
 * @description
 */
export const setBeforePageTransition = ({ fn }) => {
    if (!fn) return;

    mainStore.set(MAIN_STORE_BEFORE_PAGE_TRANSITION, fn);
};

/**
 * @returns {((arg0:{oldNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)}
 *
 */
export const getBeforePageTransition = () => {
    const { beforePageTransition } = mainStore.get();
    return beforePageTransition;
};

/**
 * @param {Object} obj
 * @param {((arg0:{oldNode:HTMLElement,newNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)} [ obj.fn ]
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setPageTransition = ({ fn }) => {
    if (!fn) return;

    mainStore.set(MAIN_STORE_PAGE_TRANSITION, fn);
};

/**
 * @returns {((arg0:{oldNode:HTMLElement,newNode:HTMLElement,oldRoute:string,newRoute:string}) => Promise<any>|undefined)}
 *
 */
export const getPageTransition = () => {
    const { pageTransition } = mainStore.get();
    return pageTransition;
};
