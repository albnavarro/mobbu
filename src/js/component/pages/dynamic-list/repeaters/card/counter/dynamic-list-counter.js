//@ts-check

import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicCounterType>} */
export const DynamicListCounterFn = ({ getState, bindText }) => {
    const { parentListId } = getState();

    return htmlObject({
        className: 'c-dynamic-counter',
        content: [
            {
                tag: 'p',
                className: 'title',
                content: 'Nested:',
            },
            {
                tag: 'p',
                className: 'subtitle',
                content: '(slotted)',
            },
            {
                tag: 'p',
                className: 'list',
                content: `list index: ${parentListId}`,
            },
            {
                tag: 'span',
                content: bindText`${'counter'}`,
            },
        ],
    });
};
