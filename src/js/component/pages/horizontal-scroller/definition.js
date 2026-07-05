import { MobJs } from '@mobJs';
import { HorizontalScrollerFunction } from './horizontal-scroller';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HorizontalScroller = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScroller>} */
    ({
        tag: 'horizontal-scroller',
        component: HorizontalScrollerFunction,
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
