//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugHeadFn } from './debugHead';

export const DebugHead = createComponent({
    name: 'debug-head',
    component: DebugHeadFn,
    exportState: ['active'],
    state: {
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
