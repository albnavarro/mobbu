import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent} */
export const DebugButtonFunction = () => {
    const debugIcon = getIcons()['debugIcon'];

    return htmlObject({
        tag: 'button',
        className: 'c-btn-debug',
        attributes: {
            type: 'button',
            'aria-label': 'open debug application dialog',
            'aria-haspopup': 'dialog',
        },
        content: debugIcon,
    });
};
