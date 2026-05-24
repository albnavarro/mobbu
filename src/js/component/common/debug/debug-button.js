import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').DebugOverlayCta>} */
export const DebugButtonFn = ({ onMount, addMethod }) => {
    onMount(({ element }) => {
        addMethod('setFocus', () => {
            element.focus({ preventScroll: true, focusVisible: true });
        });
    });

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: 'c-btn-debug',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
