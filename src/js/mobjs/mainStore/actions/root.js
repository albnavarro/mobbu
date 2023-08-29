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
export const setContent = ({ contentId = '' }) => {
    mainStore.set('contentId', contentId);
};

/**
 * @returns { HTMLElement }
 *
 * @description
 * Set root app.
 */
export const getContent = () => {
    const { contentId } = mainStore.get();
    return contentId;
};
