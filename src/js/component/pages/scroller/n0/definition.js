//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
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
            stagger: () => ({
                value: {
                    type: 'equal',
                    each: 6,
                    from: 'random',
                },
                type: 'Any',
            }),
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
        state: {
            isMounted: false,
        },
    })
);
