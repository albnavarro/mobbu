//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerFn } from './horizontal-scroller';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HorizontalScroller = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScroller>} */
    ({
        tag: 'horizontal-scroller',
        component: HorizontalScrollerFn,
        props: {
            animatePin: {
                __value: false,
                __type: Boolean,
            },
        },
        state: {
            currentId: {
                __value: 0,
                __type: Number,
                __skipEqual: false,
            },
            currentIdFromScroll: {
                __value: 0,
                __type: Number,
            },
        },
    })
);
