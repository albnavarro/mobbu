import { MobJs } from '@mobJs';
import { DebugHeadFn } from './debug-head';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugHead = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugHeadType>} */
    ({
        tag: 'debug-head',
        component: DebugHeadFn,
        props: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
        state: {
            shouldUpdate: {
                __value: true,
                __type: Boolean,
                __skipEqual: false,
            },
        },
    })
);
