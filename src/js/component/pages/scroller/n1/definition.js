//@ts-check

import { MobJs } from '@mobJs';
import { ScrollerN1Fn } from './scroller-n1';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const ScrollerN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollerN1>} */
    ({
        tag: 'scroller-n1',
        component: ScrollerN1Fn,
        props: {
            background: {
                __value: '',
                __type: String,
            },
            disableOffcanvas: {
                // value: detectFirefox() || detectSafari() ? true : false,
                __value: true,
                __type: Boolean,
            },
        },
        state: {
            isMounted: false,
            controlsActive: {
                __value: false,
                __type: Boolean,
            },
            rotation: {
                __value: 720,
                __type: Number,
            },
            rotationlabel: {
                __value: 720,
                __type: Number,
            },
        },
    })
);
