//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerSectionFunction } from './horizontal-scroller-section';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HorizontalScrollerSection = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScrollerSectionType>} */
    ({
        tag: 'horizontal-scroller-section',
        component: HorizontalScrollerSectionFunction,
        props: {
            id: {
                __value: -1,
                __type: Number,
            },
            pinClass: {
                __value: '',
                __type: String,
            },
        },
    })
);
