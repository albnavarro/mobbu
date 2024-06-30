//@ts-check

import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerButtonFn } from './horizontalScrollerButton';

export const HorizontalScrollerButton = createComponent({
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
});
