//@ts-check

import { MobJs } from '@mobJs';
import { AnimationTitleFn } from './animation-title';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnimationTitle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimationTitle>} */
    ({
        tag: 'animation-title',
        component: AnimationTitleFn,
        exportState: ['title', 'list'],
        state: {
            title: () => ({
                value: '',
                type: String,
            }),
            list: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
