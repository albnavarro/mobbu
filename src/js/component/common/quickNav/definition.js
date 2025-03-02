//@ts-check

import { createComponent } from '../../../mobjs';
import { QuickNavFn } from './nextPage';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const QuickNav = createComponent(
    /** @type{CreateComponentParams<import('./type').QuickNav>} */
    ({
        name: 'quick-nav',
        component: QuickNavFn,
        exportState: ['color', 'active', 'prevRoute', 'nextRoute', 'backRoute'],
        state: {
            color: () => ({
                value: 'white',
                type: String,
                validate: (value) => {
                    return ['white', 'black'].includes(value);
                },
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
            backRoute: () => ({
                value: '',
                type: String,
            }),
            prevRoute: () => ({
                value: '',
                type: String,
            }),
            nextRoute: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
