import { debugOverlayName } from '@instanceName';
import { MobJs } from '@mobJs';

export const openDebugOverlay = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayType>} */
    const methods = MobJs.useMethodByName(debugOverlayName);
    methods?.open();
};

let overlayJustOpen = false;
export const setSearchOverlayJustOpen = () => (overlayJustOpen = true);
export const resetSearchOverlayJustOpen = () => (overlayJustOpen = false);
export const getSearchOverlayJustOpen = () => overlayJustOpen;
