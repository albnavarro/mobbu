//@ts-check

import { createComponent } from '../../../mobjs';
import { AboutComponentFn } from './about';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const AboutComponent = createComponent(
    /** @type{CreateComponentParams<import ('./type').About>} */
    ({
        name: 'about-component',
        component: AboutComponentFn,
        exportState: ['title', 'block_1', 'block_2', 'block_3'],
        state: {
            title: () => ({
                value: '',
                type: String,
            }),
            block_1: () => ({
                value: '',
                type: String,
            }),
            block_2: () => ({
                value: '',
                type: String,
            }),
            block_3: () => ({
                value: '',
                type: String,
            }),
        },
        child: [],
    })
);
