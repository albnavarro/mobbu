import { MobJs } from '@mobJs';
import { DebugHeadFn } from './debug-head';
import { DebugSearch } from './search/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugHead = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugHead>} */
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
