//@ts-check

import { MobJs } from '@mobJs';
import { SvgChildFn } from './child';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const svgChild = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SvgChild>} */
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
