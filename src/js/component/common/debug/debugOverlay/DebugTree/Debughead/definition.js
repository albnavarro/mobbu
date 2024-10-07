//@ts-check

import { createComponent } from '../../../../../../mobjs';
import { DebugHeadFn } from './debugHead';
import { DebugSearch } from './DebugSearch/definition';

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
    child: [DebugSearch],
});
