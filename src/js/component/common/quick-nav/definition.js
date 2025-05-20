import { MobJs } from '@mobJs';
import { QuickNavFn } from './next-page';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const QuickNav = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').QuickNav>} */
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
