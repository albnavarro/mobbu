import { mobNavigationToggle } from '@instanceName';
import { MobJs } from '@mobJs';

export const setFcousToNavigationToggle = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').HeaderToggle>}
     */
    const overlayMethods = MobJs.useMethodByName(mobNavigationToggle);
    overlayMethods?.setFocus();
};
