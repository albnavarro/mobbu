import { MobJs } from '@mobJs';
import { ScrollDownLabelFn } from './scroll-down-label';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollDownLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollDownLabel>} */
    ({
        tag: 'scroll-down-label',
        component: ScrollDownLabelFn,
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
