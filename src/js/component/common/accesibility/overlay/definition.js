//@ts-check

import { MobJs } from '@mobJs';
import { AccessibilityOverlayFn } from './accessibility-overlay';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AccessibilityOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AccessibilityOverlayType>} */
    ({
        tag: 'accessibility-overlay',
        component: AccessibilityOverlayFn,
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
