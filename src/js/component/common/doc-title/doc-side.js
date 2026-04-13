import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleFn = () => {
    return htmlObject({
        className: 'c-doc-title',
        content: {
            tag: 'h2',
            content: {
                tag: 'mobjs-slot',
            },
        },
    });
};
