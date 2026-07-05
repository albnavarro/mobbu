//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListButtonFunction } from './dynamic-list-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DynamicListButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListButtonType>} */
    ({
        tag: 'dynamic-list-button',
        component: DynamicListButtonFunction,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
