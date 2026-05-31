import { getIcons } from '@data/index';
import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').DebugOverlayCta>} */
export const DebugButtonFn = ({ getProxi }) => {
    const proxi = getProxi();
    const debugIcon = getIcons()['debugIcon'];

    return htmlObject({
        tag: 'button',
        className: 'c-btn-debug',
        attributes: proxi.ariaControls
            ? {
                  type: 'button',
                  'aria-label': 'open debug application dialog',
                  'aria-haspopup': 'dialog',
              }
            : {
                  type: 'button',
              },
        content: debugIcon,
    });
};
