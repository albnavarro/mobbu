import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleSmallFn = () => {
    return htmlObject({
        tag: 'nav',
        attributes: { 'aria-label': 'BreadCrumbs' },
        className: 'l-doc-breadcrumbs',
        content: {
            tag: 'ul',
            className: 'c-breadcrumbs',
            content: {
                tag: 'mobjs-slot',
            },
        },
    });
};
