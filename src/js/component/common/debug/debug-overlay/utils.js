import { debugOverlayName } from '@instanceName';
import { MobJs } from '@mobJs';

export const openDebugOverlay = () => {
    /** @type {import('@mobJsType').UseMethodByName<import('./type').DebugOverlayType>} */
    const methods = MobJs.useMethodByName(debugOverlayName);
    methods?.open();
};

let isOverlayJustOpen = false;

export const setSearchOverlayJustOpen = () => {
    isOverlayJustOpen = true;
};

export const resetSearchOverlayJustOpen = () => {
    isOverlayJustOpen = false;
};

export const getSearchOverlayJustOpen = () => isOverlayJustOpen;
