//@ts-check

import { MobJs } from '../../../mobjs';
import { ScrollToTopFn } from './ScrollToTop';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const ScrollToTop = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollToTop>} */
    ({
        name: 'scroll-to-top',
        component: ScrollToTopFn,
        exportState: ['active'],
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
