import { fromObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {DynamicListSlottedLabel} from "./type"
 */

/** @type {MobComponent<DynamicListSlottedLabel>} * */
export const DynamicListSlottedLabelFn = ({ bindText }) => {
    return fromObject({
        className: 'c-dynamic-list-slotted-label',
        content: {
            tag: 'p',
            content: bindText`slotted: ${'label'}`,
        },
    });
};
