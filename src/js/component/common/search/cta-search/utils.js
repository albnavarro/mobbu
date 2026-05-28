import { searchOverlayCta } from '@instanceName';
import { MobJs } from '@mobJs';

export const setFcousToSearchBtn = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayCta>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlayCta);
    overlayMethods?.setFocus();
};

/**
 * @param {boolean} value
 */
export const setExpandedToSerachBtn = (value) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlayCta>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlayCta);
    overlayMethods?.setExpanded(value);
};
