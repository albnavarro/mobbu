//@ts-check

import { MobJs } from '@mobJs';
import { AccessibilityToggleFunction } from './accessibility-toggle';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AccessibilityToggle = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AccessibilityToggleType>} */
    ({
        tag: 'accessibility-toggle',
        component: AccessibilityToggleFunction,
        props: {
            className: {
                __value: '',
                __type: String,
            },
            label: {
                __value: '',
                __type: String,
            },
            ariaLabel: {
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
