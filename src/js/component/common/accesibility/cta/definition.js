import { MobJs } from '@mobJs';
import { AccessibilityButtonFn } from './accessibility-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AccessibilityButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AccessibilityCtaType>} */
    ({
        tag: 'accessibility-button',
        component: AccessibilityButtonFn,
    })
);
