//@ts-check

import { MobJs } from '@mobJs';
import { ScrollerN0Function } from './scroller-n0';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const ScrollerN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollerN0>} */
    ({
        tag: 'scroller-n0',
        component: ScrollerN0Function,
        props: {
            background: {
                __value: '',
                __type: String,
            },
        },
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
            controlsActive: {
                __value: false,
                __type: Boolean,
            },
            destroy: {
                __value: () => {},
                __type: Function,
            },
            currentParamsId: {
                __value: 0,
                __type: Number,
            },
        },
    })
);
