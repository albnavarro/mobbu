//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { SvgChildFn } from './child';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const svgChild = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').SvgChild>} */
    ({
        name: 'svg-child',
        component: SvgChildFn,
        exportState: ['svg', 'star'],
        state: {
            star: () => ({
                value: '',
                type: String,
            }),
            svg: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
