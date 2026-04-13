import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {DynamicListSlottedLabelType} from "./type"
 */

/** @type {MobComponent<DynamicListSlottedLabelType>} * */
export const DynamicListSlottedLabelFn = ({ bindText }) => {
    return htmlObject({
        className: 'c-dynamic-list-slotted-label',
        content: {
            tag: 'p',
            content: bindText`slotted: ${'label'}`,
        },
    });
};
