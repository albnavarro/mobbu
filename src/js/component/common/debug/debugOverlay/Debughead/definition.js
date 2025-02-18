//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DebugHeadFn } from './debugHead';
import { DebugSearch } from './DebugSearch/definition';

/**
 * @import { CreateComponentParams } from "../../../../../mobjs/type";
 **/

export const DebugHead = createComponent(
    /** @type{CreateComponentParams<import('./type').DebugHead>} */
    ({
        name: 'debug-head',
        component: DebugHeadFn,
        exportState: ['active'],
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
            shouldUpdate: () => ({
                value: true,
                type: Boolean,
                skipEqual: false,
            }),
        },
        child: [DebugSearch],
    })
);
