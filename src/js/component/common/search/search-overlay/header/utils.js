import { searchOverlayHeader } from '@instanceName';
import { MobJs } from '@mobJs';

export const searchOverlaySetInputFocus = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.setInputFocus();
};

/**
 * @param {string} word
 */
export const updateSearchFromSuggestion = (word) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.updateCurrentSearchFromSuggestion(word);
};

/**
 * @param {HTMLElement} target
 */
export const shouldCloseSearchSuggestion = (target) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.shouldCloseSuggestion(target);
};

export const closeSearchSuggestion = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.closeSuggestion();
};
