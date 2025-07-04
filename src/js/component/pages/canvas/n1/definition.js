//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { CaterpillarN1Fn } from './caterpillar-n1';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const CaterpillarN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CaterpillarN1>} */
    ({
        tag: 'caterpillar-n1',
        component: CaterpillarN1Fn,
        exportState: [
            'numItems',
            'width',
            'height',
            'fill',
            'opacity',
            'radius',
            'rotationEach',
            'centerEach',
            'rotationDuration',
            'disableOffcanvas',
        ],
        state: {
            isMounted: false,
            numItems: 20,
            width: window.innerHeight / 30,
            height: window.innerHeight / 30,
            fill: [14],
            opacity: 0.05,
            radius: 0,
            rotationEach: 15,
            centerEach: 3,
            rotationDuration: 5000,
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
    })
);
