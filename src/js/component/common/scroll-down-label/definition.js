import { MobJs } from '@mobJs';
import { ScrollDownLabelFunction } from './scroll-down-label';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const ScrollDownLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollDownLabel>} */
    ({
        tag: 'scroll-down-label',
        component: ScrollDownLabelFunction,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
