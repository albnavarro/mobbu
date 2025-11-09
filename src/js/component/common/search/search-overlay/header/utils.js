import { MobJs } from '@mobJs';
import { searchOverlayHeader } from 'src/js/component/instance-name';

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
 * @param {HTMLElement} currentTarget
 */
export const shouldCloseSearchSuggestion = (currentTarget) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.shouldCloseSuggestion(currentTarget);
};

export const closeSearchSuggestion = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayHeader>}
     */
    const headerMethods = MobJs.useMethodByName(searchOverlayHeader);
    headerMethods?.closeSuggestion();
};
