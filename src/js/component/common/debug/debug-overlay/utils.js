import { debugOverlayName } from '@instanceName';
import { MobJs } from '@mobJs';

export const toggleDebugOverlay = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayType>} */
    const methods = MobJs.useMethodByName(debugOverlayName);
    methods?.toggle();
};
