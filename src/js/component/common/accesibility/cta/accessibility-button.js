import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityCtaType>} */
export const AccessibilityButtonFn = () => {
    const icon = getIcons()['accessibilityIcons'];

    return htmlObject({
        tag: 'button',
        className: 'c-btn-accessibility',
        attributes: {
            type: 'button',
            'aria-label': 'open accessibility popover',
            popovertarget: 'accessibility-popover',
            popovertargetaction: 'show',
        },
        content: icon,
    });
};
