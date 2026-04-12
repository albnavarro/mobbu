import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DocTitleSmallFn = () => {
    return fromObject({
        className: 'l-doc-breadcrumbs',
        content: {
            tag: 'mobjs-slot',
        },
    });
};
