//@ts-check

import { MobJs } from '@mobJs';
import { DynamicListSlottedLabelFunction } from './dynamic-list-slotted-label';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DynamicListSlottedLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').DynamicListSlottedLabelType>} */
    ({
        tag: 'dynamic-slotted-label',
        component: DynamicListSlottedLabelFunction,
        props: {
            label: {
                __value: '',
                __type: String,
            },
        },
    })
);
