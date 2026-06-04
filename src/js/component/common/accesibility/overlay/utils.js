import { accessibilityOverlayName } from '@instanceName';
import { MobJs } from '@mobJs';

export const openAccessibilityOverlay = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').AccessibilityOverlayType>} */
    const methods = MobJs.useMethodByName(accessibilityOverlayName);
    methods?.open();
};
