//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { CaterpillarN0Fn } from './caterpillar-n0';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const CaterpillarN0 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CaterpillarN0>} */
    ({
        name: 'caterpillar-n0',
        component: CaterpillarN0Fn,
        exportState: [
            'nextRoute',
            'prevRoute',
            'amountOfPath',
            'width',
            'height',
            'radius',
            'fill',
            'stroke',
            'opacity',
            'spacerY',
            'intialRotation',
            'perpetualRatio',
            'mouseMoveRatio',
            'disableOffcanvas',
        ],
        state: {
            isMounted: false,
            nextRoute: () => ({
                value: '',
                type: String,
            }),
            prevRoute: () => ({
                value: '',
                type: String,
            }),
            amountOfPath: 17,
            width: 30,
            height: 30,
            radius: 0,
            fill: [-1],
            stroke: '#000',
            opacity: 0.05,
            spacerY: (/** @type {any} */ condition) => (condition ? 300 : -400),
            intialRotation: 33,
            perpetualRatio: 6,
            mouseMoveRatio: 10,
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
    })
);
