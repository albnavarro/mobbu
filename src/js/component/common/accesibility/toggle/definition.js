//@ts-check

import { MobJs } from '@mobJs';
import { AccessibilityToggleFn } from './accessibility-toggle';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AccessibilityToggle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AccessibilityToggleType>} */
    ({
        tag: 'accessibility-toggle',
        component: AccessibilityToggleFn,
        props: {
            className: {
                __value: '',
                __type: String,
            },
            name: {
                __value: '',
                __type: String,
            },
            options: {
                __value: [],
                __type: Array,
            },
        },
        state: {
            activeId: {
                __value: '',
                __type: String,
            },
        },
    })
);
