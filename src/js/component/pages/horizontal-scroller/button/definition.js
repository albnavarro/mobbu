//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerButtonFunction } from './horizontal-scroller-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HorizontalScrollerButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScrollerButtonType>} */
    ({
        tag: 'horizontal-scroller-button',
        component: HorizontalScrollerButtonFunction,
        props: {
            id: {
                __value: -1,
                __type: Number,
            },
        },
    })
);
