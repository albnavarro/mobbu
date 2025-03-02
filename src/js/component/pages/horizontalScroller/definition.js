//@ts-check

import { createComponent } from '../../../mobjs';
import { HorizontalScrollerFn } from './horizontalScroller';
import { HorizontalScrollerButton } from './horizontalScrollerButton/definition';
import { HorizontalScrollerSection } from './horizontalScrollerSection/definition';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const HorizontalScroller = createComponent(
    /** @type{CreateComponentParams<import('./type').HorizontalScroller>} */
    ({
        name: 'horizontal-scroller',
        component: HorizontalScrollerFn,
        exportState: [
            'nextRoute',
            'prevRoute',
            'backRoute',
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
            backRoute: () => ({
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
    })
);
