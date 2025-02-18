//@ts-check

import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerButtonFn } from './horizontalScrollerButton';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const HorizontalScrollerButton = createComponent(
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
