//@ts-check

import { MobJs } from '../../../mobjs';
import { HorizontalScrollerFn } from './horizontalScroller';
import { HorizontalScrollerButton } from './horizontalScrollerButton/definition';
import { HorizontalScrollerSection } from './horizontalScrollerSection/definition';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const HorizontalScroller = MobJs.createComponent(
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
