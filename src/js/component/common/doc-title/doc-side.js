import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleFn = () => {
    return htmlObject({
        className: 'c-doc-title',
        content: {
            tag: 'svg',
            attributes: { 'aria-hidden': true, role: 'img' },
            content: {
                tag: 'svg',
                content: {
                    tag: 'text',
                    attributes: { x: 0, y: '100' },
                    content: {
                        tag: 'mobjs-slot',
                    },
                },
            },
        },
    });
};
