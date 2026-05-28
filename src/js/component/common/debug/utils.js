import { debugCtaName } from '@instanceName';
import { MobJs } from '@mobJs';

export const setFcousToDebugBtn = () => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayCta>}
     */
    const overlayMethods = MobJs.useMethodByName(debugCtaName);
    overlayMethods?.setFocus();
};

/**
 * @param {boolean} value
 */
export const setExpandedToDebugBtn = (value) => {
    /**
     * @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayCta>}
     */
    const overlayMethods = MobJs.useMethodByName(debugCtaName);
    overlayMethods?.setExpanded(value);
};
