import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleSmallFn = () => {
    return htmlObject({
        className: 'l-doc-breadcrumbs',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
