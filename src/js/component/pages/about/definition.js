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
        exportState: ['title'],
        state: {
            title: () => ({
                value: '',
                type: String,
            }),
        },
        child: [],
    })
);
