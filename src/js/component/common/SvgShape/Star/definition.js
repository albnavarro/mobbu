//@ts-check

import { createComponent } from '../../../../mobjs';
import { StarSvgFn } from './StarSvg';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const StarSvg = createComponent(
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
