//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerFn } from './horizontal-scroller';
import { HorizontalScrollerButton } from './button/definition';
import { HorizontalScrollerSection } from './section/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HorizontalScroller = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScroller>} */
    ({
        tag: 'horizontal-scroller',
        component: HorizontalScrollerFn,
        props: {
            animatePin: () => ({
                value: false,
                type: Boolean,
            }),
        },
        state: {
            currentId: () => ({
                value: 0,
                type: Number,
            }),
            currentIdFromScroll: () => ({
                value: 0,
                type: Number,
            }),
        },
        child: [HorizontalScrollerButton, HorizontalScrollerSection],
    })
);
