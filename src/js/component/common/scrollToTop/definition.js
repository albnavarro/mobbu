//@ts-check

import { MobJs } from '@mobJs';
import { ScrollToTopFn } from './ScrollToTop';

/**
 * @import { CreateComponentParams } from "@mobJsType";
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
