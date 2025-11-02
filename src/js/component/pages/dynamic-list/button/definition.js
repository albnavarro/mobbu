//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListButtonFn } from './dynamic-list-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DynamicListButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListButton>} */
    ({
        tag: 'dynamic-list-button',
        component: DynamicListButtonFn,
        props: {
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
