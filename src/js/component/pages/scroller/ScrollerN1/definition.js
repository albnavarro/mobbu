//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { ScrollerN1Fn } from './scrollerN1';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const ScrollerN1 = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollerN1>} */
    ({
        name: 'scroller-n1',
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
    })
);
