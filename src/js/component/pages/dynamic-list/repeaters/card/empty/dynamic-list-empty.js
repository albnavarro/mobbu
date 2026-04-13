import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DynamicListEmptyFn = () => {
    return htmlObject({
        className: 'c-dynamic-list-empty',
        content: [
            {
                tag: 'p',
                content: 'empty comp',
            },
            {
                tag: 'mobjs-slot',
                attributes: { name: 'empty-slot' },
            },
        ],
    });
};
