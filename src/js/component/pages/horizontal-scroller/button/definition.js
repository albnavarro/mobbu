//@ts-check

import { MobJs } from '@mobJs';
import { HorizontalScrollerButtonFn } from './horizontal-scroller-button';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HorizontalScrollerButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HorizontalScrollerButtonType>} */
    ({
        tag: 'horizontal-scroller-button',
        component: HorizontalScrollerButtonFn,
        props: {
            id: () => ({
                value: -1,
                type: Number,
            }),
        },
    })
);
