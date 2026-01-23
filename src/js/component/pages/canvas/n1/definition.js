//@ts-check

import { MobJs } from '@mobJs';
import { CaterpillarN1Fn } from './caterpillar-n1';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const CaterpillarN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CaterpillarN1>} */
    ({
        tag: 'caterpillar-n1',
        component: CaterpillarN1Fn,
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
            controlsActive: () => ({
                value: false,
                type: Boolean,
            }),
            destroy: () => ({
                value: () => {},
                type: Function,
            }),
            stopBlackOne: () => ({
                value: () => {},
                type: Function,
            }),
            blackOneIsStopped: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
