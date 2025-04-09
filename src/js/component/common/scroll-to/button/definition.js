//@ts-check

import { MobJs } from '@mobJs';
import { ScrollToButtonFn } from './scroll-to-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollToButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollToButton>} */
    ({
        name: 'scroll-to-button',
        component: ScrollToButtonFn,
        exportState: ['label', 'active'],
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
