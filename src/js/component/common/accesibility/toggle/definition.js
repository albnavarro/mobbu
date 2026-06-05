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
            option_a: {
                label: {
                    __value: '',
                    __type: String,
                },
                icon: {
                    __value: '',
                    __type: String,
                },
                id: {
                    __value: '',
                    __type: String,
                },
                callback: {
                    __value: () => {},
                    __type: Function,
                },
            },
            option_b: {
                label: {
                    __value: '',
                    __type: String,
                },
                icon: {
                    __value: '',
                    __type: String,
                },
                id: {
                    __value: '',
                    __type: String,
                },
                callback: {
                    __value: () => {},
                    __type: Function,
                },
            },
        },
    })
);
