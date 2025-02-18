//@ts-check

import { createComponent } from '../../../../mobjs';
import { SvgChildFn } from './child';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const svgChild = createComponent(
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
