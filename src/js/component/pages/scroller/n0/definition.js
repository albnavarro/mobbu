//@ts-check

import { MobJs } from '@mobJs';
import { ScrollerN0Fn } from './scroller-n0';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const ScrollerN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollerN0>} */
    ({
        tag: 'scroller-n0',
        component: ScrollerN0Fn,
        props: {
            background: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
            controlsActive: () => ({
                value: false,
                type: Boolean,
            }),
            destroy: () => ({
                value: () => {},
                type: Function,
            }),
            currentParamsId: () => ({
                value: 0,
                type: Number,
            }),
        },
    })
);
