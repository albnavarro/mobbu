//@ts-check

import { MobJs } from '@mobJs';
import { CaterpillarN1Fn } from './caterpillar-n1';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const CaterpillarN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CaterpillarN1>} */
    ({
        tag: 'caterpillar-n1',
        component: CaterpillarN1Fn,
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
            destroy: {
                __value: () => {},
                __type: Function,
            },
            stopBlackOne: {
                __value: () => {},
                __type: Function,
            },
            blackOneIsStopped: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
