//@ts-check

import { MobJs } from '@mobJs';
import { DEBUG_USE_TREE } from './constant';
import { DebugComponent } from './debug-component/definition';
import { DebugFilterHead } from './debug-filter/head/definition';
import { DebugFilterList } from './debug-filter/list/definition';
import { DebugHead } from './head/definition';
import { DebugOverlayFn } from './debug-overlay';
import { DebugTree } from './tree/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DebugOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DebugOverlay>} */
    ({
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
        child: [
            DebugTree,
            DebugComponent,
            DebugHead,
            DebugFilterHead,
            DebugFilterList,
        ],
    })
);
