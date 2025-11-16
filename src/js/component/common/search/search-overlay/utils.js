import { searchOverlay } from '@instanceName';
import { MobJs } from '@mobJs';

export const toggleSearchOverlay = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlay>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlay);
    overlayMethods?.toggle();
};
