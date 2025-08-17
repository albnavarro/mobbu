//@ts-check

import { MobJs } from '@mobJs';
import { detectFirefox, detectSafari } from '@utils/utils';
import { ScrollerN1Fn } from './scroller-n1';
import { AnimationTitle } from '@commonComponent/animation-title/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollerN1 = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollerN1>} */
    ({
        tag: 'scroller-n1',
        component: ScrollerN1Fn,
        exportState: [
            'amountOfPath',
            'width',
            'height',
            'radius',
            'opacity',
            'intialRotation',
            'endRotation',
            'disableOffcanvas',
        ],
        state: {
            isMounted: false,
            amountOfPath: 17,
            width: 15,
            height: 40,
            radius: 0,
            opacity: 0.05,
            intialRotation: 33,
            endRotation: 720,
            disableOffcanvas: () => ({
                value: detectFirefox() || detectSafari() ? true : false,
                type: Boolean,
            }),
        },
        child: [AnimationTitle],
    })
);
