//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { ScrollToTopFn } from './ScrollToTop';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
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
