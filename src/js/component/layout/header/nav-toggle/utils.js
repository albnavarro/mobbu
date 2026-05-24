import { mobNavigationToggleName } from '@instanceName';
import { MobJs } from '@mobJs';

export const setFcousToNavigationToggle = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').HeaderToggle>}
     */
    const overlayMethods = MobJs.useMethodByName(mobNavigationToggleName);
    overlayMethods?.setFocus();
};
