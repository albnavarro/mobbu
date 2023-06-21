// @ts-check

import { mainStore } from '../mainStore';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.root
 * returns void
 *
 *
 * @description
 * Set root app.
 */
export const setRoot = ({ root = document.createElement('div') }) => {
    mainStore.set('root', root);
};

/**
 * returns HTMLElement
 *
 * @description
 * Set root app.
 */
export const getRoot = () => {
    const { root } = mainStore.get();
    return root;
};
