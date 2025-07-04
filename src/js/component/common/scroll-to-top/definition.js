import { MobJs } from '@mobJs';
import { ScrollToTopFn } from './scroll-to-top';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollToTop = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollToTop>} */
    ({
        tag: 'scroll-to-top',
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
