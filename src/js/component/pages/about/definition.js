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
        exportState: ['block_1', 'block_2', 'block_3', 'block_4'],
        state: {
            block_1: () => ({
                value: {
                    titleTop: '',
                    titleBottom: '',
                },
                type: 'any',
            }),
            block_2: () => ({
                value: {
                    title: '',
                    copy: '',
                },
                type: 'any',
            }),
            block_3: () => ({
                value: '',
                type: String,
            }),
            block_4: () => ({
                value: '',
                type: String,
            }),
        },
        child: [],
    })
);
