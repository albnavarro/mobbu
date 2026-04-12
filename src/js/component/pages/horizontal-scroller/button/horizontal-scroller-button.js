//@ts-check

import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').HorizontalScrollerButtonType>} */
export const HorizontalScrollerButtonFn = ({ getProxi }) => {
    const proxi = getProxi();

    return fromObject({
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
