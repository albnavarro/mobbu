//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { HorizontalScrollerButtonFn } from './horizontalScrollerButton';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
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
