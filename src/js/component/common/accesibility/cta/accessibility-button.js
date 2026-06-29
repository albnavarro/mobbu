import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';
import { openAccessibilityOverlay } from '../overlay/utils';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').AccessibilityCtaType>} */
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
            'aria-label': 'open accessibility dialog',
            'aria-haspopup': 'dialog',
        },
        modules: [
            delegateEvents({
                click: () => {
                    openAccessibilityOverlay();
                },
            }),
            bindEffect({
                toggleClass: {
                    active: () => boundedProxi.accessibilityDialogOpen === true,
                },
            }),
        ],
        content: icon,
    });
};
