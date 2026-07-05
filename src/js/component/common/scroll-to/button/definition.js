import { MobJs } from '@mobJs';
import { ScrollToButtonFunction } from './scroll-to-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const ScrollToButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollToButtonType>} */
    ({
        tag: 'scroll-to-button',
        component: ScrollToButtonFunction,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            active: {
                __value: false,
                __type: Boolean,
            },
            isSection: {
                __value: false,
                __type: Boolean,
            },
            isNote: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
