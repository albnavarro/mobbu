//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerFn } from './horizontal-scroller';
import { HorizontalScrollerButton } from './button/definition';
import { HorizontalScrollerSection } from './section/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const HorizontalScroller = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScroller>} */
    ({
        tag: 'horizontal-scroller',
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
