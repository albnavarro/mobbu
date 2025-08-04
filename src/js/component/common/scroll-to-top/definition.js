import { MobJs } from '@mobJs';
import { ScrollToTopFn } from './scroll-to-top';
import { navigationStore } from '@layoutComponent/navigation/store/nav-store';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollToTop = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollToTop>} */
    ({
        tag: 'scroll-to-top',
        component: ScrollToTopFn,
        exportState: ['active'],
        bindStore: navigationStore,
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
