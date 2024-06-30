//@ts-check

import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerSectionFn } from './horizontalScrollerSection';

export const HorizontalScrollerSection = createComponent({
    name: 'horizontal-scroller-section',
    component: HorizontalScrollerSectionFn,
    exportState: ['id', 'pinClass'],
    state: {
        id: () => ({
            id: -1,
            type: Number,
        }),
        pinClass: () => ({
            id: '',
            type: String,
        }),
    },
});
