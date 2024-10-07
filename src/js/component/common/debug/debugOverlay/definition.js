//@ts-check

import { createComponent } from '../../../../mobjs';
import { DebugComponent } from './DebugComponent/definition';
import { DebugOverlayFn } from './debugOverlay';
import { DebugHead } from './DebugTree/Debughead/definition';
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
    child: [DebugTree, DebugComponent, DebugHead],
});
