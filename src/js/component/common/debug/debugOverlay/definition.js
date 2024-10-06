//@ts-check

import { createComponent } from '../../../../mobjs';
import { DebugOverlayFn } from './debugOverlay';
import { DebugTree } from './DebugTree/definition';

export const DebugOverlay = createComponent({
    name: 'debug-overlay',
    component: DebugOverlayFn,
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [DebugTree],
});
