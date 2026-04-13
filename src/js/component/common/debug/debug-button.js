import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent} */
export const DebugButtonFn = () => {
    return htmlObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: 'c-btn-debug',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
