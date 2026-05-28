import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').DebugOverlayCta>} */
export const DebugButtonFn = ({ onMount, addMethod, getProxi, bindEffect }) => {
    const proxi = getProxi();

    addMethod('setExpanded', (value) => {
        proxi.expanded = value;
    });

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
                  'aria-label': 'open debug dialog',
                  'aria-haspopup': 'dialog',
              }
            : {
                  type: 'button',
              },
        className: 'c-btn-debug',
        modules: bindEffect({
            toggleAttribute: {
                'aria-expanded': () => (proxi.expanded ? 'true' : 'false'),
            },
        }),
        content: {
            tag: 'mobjs-slot',
        },
    });
};
