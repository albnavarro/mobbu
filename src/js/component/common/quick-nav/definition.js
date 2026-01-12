import { MobJs } from '@mobJs';
import { QuickNavFn } from './next-page';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const QuickNav = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').QuickNav>} */
    ({
        tag: 'quick-nav',
        component: QuickNavFn,
        state: {
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
