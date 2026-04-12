import { fromObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent} */
export const DebugButtonFn = () => {
    return fromObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: 'c-btn-debug',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
