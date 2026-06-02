//@ts-check

import { MobJs } from '@mobJs';
import { DEBUG_USE_TREE } from './constant';
import { DebugOverlayFn } from './debug-overlay';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DebugOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugOverlayType>} */
    ({
        tag: 'debug-overlay',
        component: DebugOverlayFn,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
            listType: {
                __value: DEBUG_USE_TREE,
                __type: String,
            },
        },
    })
);
