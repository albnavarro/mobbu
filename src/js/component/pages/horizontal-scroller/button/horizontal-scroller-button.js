//@ts-check

import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').HorizontalScrollerButtonType>} */
export const HorizontalScrollerButtonFn = ({ getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'li',
        className: 'nav-item',
        content: {
            tag: 'button',
            attributes: { type: 'button' },
            dataAttributes: { id: proxi.id },
            className: 'nav-button',
            content: `${proxi.id}`,
        },
    });
};
