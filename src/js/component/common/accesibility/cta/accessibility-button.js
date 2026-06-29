import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';
import { toggleAccessibilityOverlay } from '../overlay/utils';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityButtonType>} */
export const AccessibilityButtonFn = ({
    delegateEvents,
    getBoundedProxi,
    bindEffect,
}) => {
    const boundedProxi = getBoundedProxi();
    const icon = getIcons()['accessibilityIcons'];

    return htmlObject({
        tag: 'button',
        className: 'c-btn-accessibility',
        attributes: {
            type: 'button',
            'aria-label': 'open accessibility popover',
        },
        modules: [
            delegateEvents({
                click: () => {
                    toggleAccessibilityOverlay();
                },
            }),
            bindEffect({
                toggleAttribute: {
                    'aria-expanded': () =>
                        boundedProxi.accessibilityIsOpen ? 'true' : 'false',
                },
            }),
        ],
        content: icon,
    });
};
