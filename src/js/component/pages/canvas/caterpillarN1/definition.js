//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { detectFirefox, detectSafari } from '../../../../utils/utils';
import { CaterpillarN1Fn } from './caterpillarN1';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const CaterpillarN1 = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').CaterpillarN1>} */
    ({
        name: 'caterpillar-n1',
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
            width: 40,
            height: 40,
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
