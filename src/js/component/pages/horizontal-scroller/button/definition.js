//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerButtonFn } from './horizontal-scroller-button';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const HorizontalScrollerButton = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').HorizontalScrollerButton>} */
    ({
        name: 'horizontal-scroller-button',
        component: HorizontalScrollerButtonFn,
        exportState: ['id', 'active'],
        state: {
            id: () => ({
                value: -1,
                type: Number,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
