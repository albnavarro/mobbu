// @ts-check

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
    mainStore.set('contentId', contentId);
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
    mainStore.set('rootElement', element);
};
