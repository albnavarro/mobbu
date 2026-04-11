//@ts-check

import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').HorizontalScrollerSection>} */
export const HorizontalScrollerSectionFn = ({ getState }) => {
    const { id, pinClass } = getState();

    return fromObject({
        className: 'column js-column',
        dataAttributes: { shadow: `section-${id}` },
        content: {
            className: 'wrap',
            content: [
                {
                    tag: 'span',
                    className: `h-scroller-indicator js-indicator ${pinClass}`,
                    content: {
                        tag: 'span',
                    },
                },
                {
                    className: 'title js-title',
                    content: {
                        tag: 'h1',
                        content: `${id}`,
                    },
                },
            ],
        },
    });
};
