//@ts-check

import { createComponent } from '../../../../mobjs';
import { DebugOverlayFn } from './debugOverlay';

export const DebugOverlay = createComponent({
    name: 'debug-overlay',
    component: DebugOverlayFn,
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
