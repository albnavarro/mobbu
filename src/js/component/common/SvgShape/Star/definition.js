//@ts-check

import { MobJs } from '@mobJs';
import { StarSvgFn } from './StarSvg';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const StarSvg = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').StarSvg>} */
    ({
        name: 'svg-star',
        component: StarSvgFn,
        exportState: ['fill'],
        state: {
            fill: () => ({
                value: '#000000',
                type: String,
            }),
        },
    })
);
