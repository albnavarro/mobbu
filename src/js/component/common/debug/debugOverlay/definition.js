//@ts-check

import { createComponent } from '../../../../mobjs';
import { DEBUG_USE_TREE } from './constant';
import { DebugComponent } from './DebugComponent/definition';
import { DebugFilterHead } from './DebugFilter/DebugFilterHead/definition';
import { DebugFilterList } from './DebugFilter/DebugFilterList/definition';
import { DebugHead } from './Debughead/definition';
import { DebugOverlayFn } from './debugOverlay';
import { DebugTree } from './DebugTree/definition';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DebugOverlay = createComponent(
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
