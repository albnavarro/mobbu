import { MobJs } from '@mobJs';
import { searchOverlay } from 'src/js/component/instance-name';

export const toggleSearchOverlay = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').SearchOverlay>}
     */
    const overlayMethods = MobJs.useMethodByName(searchOverlay);
    overlayMethods?.toggle();
};
