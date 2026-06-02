import { MobJs } from '@mobJs';
import { QuickNavFn } from './next-page';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const QuickNav = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').QuickNav>} */
    ({
        tag: 'quick-nav',
        component: QuickNavFn,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
            backRoute: {
                __value: '',
                __type: String,
            },
            prevRoute: {
                __value: '',
                __type: String,
            },
            nextRoute: {
                __value: '',
                __type: String,
            },
            currentLabelId: {
                __value: -1,
                __type: Number,
            },
        },
    })
);
