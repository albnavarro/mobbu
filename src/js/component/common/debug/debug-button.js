import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').DebugOverlayCta>} */
export const DebugButtonFn = ({ onMount, addMethod, getProxi }) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        addMethod('setFocus', () => {
            element.focus({ preventScroll: true, focusVisible: true });
        });
    });

    return htmlObject({
        tag: 'button',
        attributes: proxi.ariaControls
            ? {
                  type: 'button',
                  'aria-controls': proxi.ariaControls,
              }
            : {
                  type: 'button',
              },
        className: 'c-btn-debug',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
