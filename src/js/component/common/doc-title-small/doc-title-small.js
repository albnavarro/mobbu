import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DocTitle>} */
export const DocTitleSmallFn = ({ getBoundedProxi, bindEffect }) => {
    const bindProxi = getBoundedProxi();

    return htmlObject({
        tag: 'nav',
        attributes: { 'aria-label': 'BreadCrumbs' },
        className: 'l-doc-breadcrumbs',
        modules: bindEffect({
            toggleAttribute: {
                inert: () => (bindProxi.shouldApplyInert ? true : null),
            },
        }),
        content: {
            tag: 'ul',
            className: 'c-breadcrumbs',
            content: {
                tag: 'mobjs-slot',
            },
        },
    });
};
