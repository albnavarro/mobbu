import { debugCtaName } from '@instanceName';
import { MobJs } from '@mobJs';

export const setFcousToDebugBtn = () => {
    console.log('toggle');

    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayCta>}
     */
    const overlayMethods = MobJs.useMethodByName(debugCtaName);
    overlayMethods?.setFocus();
};
