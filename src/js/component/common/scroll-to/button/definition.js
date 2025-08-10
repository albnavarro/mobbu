import { MobJs } from '@mobJs';
import { ScrollToButtonFn } from './scroll-to-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollToButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollToButton>} */
    ({
        tag: 'scroll-to-button',
        component: ScrollToButtonFn,
        exportState: ['label', 'active', 'isSection', 'isNote'],
        state: {
            label: () => ({
                value: '',
                type: String,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
            isSection: () => ({
                value: false,
                type: Boolean,
            }),
            isNote: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
