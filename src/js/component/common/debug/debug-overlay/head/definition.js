import { MobJs } from '@mobJs';
import { DebugHeadFn } from './debug-head';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugHead = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugHeadType>} */
    ({
        tag: 'debug-head',
        component: DebugHeadFn,
        props: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
        state: {
            shouldUpdate: () => ({
                value: true,
                type: Boolean,
                skipEqual: false,
            }),
        },
    })
);
