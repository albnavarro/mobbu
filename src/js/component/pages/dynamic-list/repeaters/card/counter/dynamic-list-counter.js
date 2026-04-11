//@ts-check

import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicCounter>} */
export const DynamicListCounterFn = ({ getState, bindText }) => {
    const { parentListId } = getState();

    return fromObject({
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
