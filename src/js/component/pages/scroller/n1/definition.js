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
            background: () => ({
                value: '',
                type: String,
            }),
            disableOffcanvas: () => ({
                // value: detectFirefox() || detectSafari() ? true : false,
                value: true,
                type: Boolean,
            }),
        },
        state: {
            isMounted: false,
        },
    })
);
