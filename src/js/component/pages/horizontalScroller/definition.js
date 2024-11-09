//@ts-check

import { createComponent } from '../../../mobjs';
import { HorizontalScrollerFn } from './horizontalScroller';
import { HorizontalScrollerButton } from './horizontalScrollerButton/definition';
import { HorizontalScrollerSection } from './horizontalScrollerSection/definition';

export const HorizontalScroller = createComponent({
    name: 'horizontal-scroller',
    component: HorizontalScrollerFn,
    exportState: [
        'nextRoute',
        'prevRoute',
        'currentId',
        'currentIdFromScroll',
        'animatePin',
    ],
    state: {
        nextRoute: () => ({
            value: '',
            type: String,
        }),
        prevRoute: () => ({
            value: '',
            type: String,
        }),
        currentId: () => ({
            value: 0,
            type: Number,
        }),
        currentIdFromScroll: () => ({
            value: 0,
            type: Number,
        }),
        animatePin: () => ({
            value: false,
            type: Boolean,
        }),
    },
    child: [HorizontalScrollerButton, HorizontalScrollerSection],
});
