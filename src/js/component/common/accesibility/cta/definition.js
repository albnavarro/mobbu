import { MobJs } from '@mobJs';
import { AccessibilityButtonFn } from './accessibility-button';
import { accessibilityStore } from '@stores/accessibility';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AccessibilityButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AccessibilityButtonType>} */
    ({
        tag: 'accessibility-button',
        component: AccessibilityButtonFn,
        bindStore: accessibilityStore,
    })
);
