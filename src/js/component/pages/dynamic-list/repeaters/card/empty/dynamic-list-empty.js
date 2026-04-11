import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent} */
export const DynamicListEmptyFn = () => {
    return fromObject({
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
