//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
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
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
        state: {
            isMounted: false,
        },
    })
);
