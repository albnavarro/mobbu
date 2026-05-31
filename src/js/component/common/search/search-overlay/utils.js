import { searchOverlay } from '@instanceName';
import { MobJs } from '@mobJs';

export const closeSearchOverlay = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlay>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlay);
    overlayMethods?.close();
};

export const openSearchOverlay = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlay>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlay);
    overlayMethods?.open();
};
