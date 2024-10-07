//@ts-check

import { createComponent } from '../../../../mobjs';
import { DEBUG_USE_TREE } from './constant';
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
        listType: () => ({
            value: DEBUG_USE_TREE,
            type: String,
        }),
    },
    child: [DebugTree, DebugComponent, DebugHead],
});
