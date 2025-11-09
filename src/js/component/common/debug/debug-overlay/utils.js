import { MobJs } from '@mobJs';
import { debugOverlayName } from 'src/js/component/instance-name';

export const toggleDebugOverlay = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlay>} */
    const methods = MobJs.useMethodByName(debugOverlayName);
    methods?.toggle();
};
