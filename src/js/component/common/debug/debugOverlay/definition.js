//@ts-check

import { MobJs } from '@mobJs';
import { DEBUG_USE_TREE } from './constant';
import { DebugComponent } from './DebugComponent/definition';
import { DebugFilterHead } from './DebugFilter/DebugFilterHead/definition';
import { DebugFilterList } from './DebugFilter/DebugFilterList/definition';
import { DebugHead } from './Debughead/definition';
import { DebugOverlayFn } from './debug-overlay';
import { DebugTree } from './DebugTree/definition';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DebugOverlay = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').DebugOverlay>} */
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
