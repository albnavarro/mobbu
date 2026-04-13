//@ts-check

import { MobJs } from '@mobJs';
import { DEBUG_USE_TREE } from './constant';
import { DebugOverlayFn } from './debug-overlay';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const DebugOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugOverlayType>} */
    ({
        tag: 'debug-overlay',
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
    })
);
