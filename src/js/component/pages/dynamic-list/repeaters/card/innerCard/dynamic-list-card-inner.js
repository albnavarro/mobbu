import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicListCardInnerType>} */
export const DynamicListCardInnerFn = ({ bindText }) => {
    return htmlObject({
        tag: 'span',
        className: 'c-dynamic-list-card-inner',
        content: {
            tag: 'span',
            content: bindText`${'key'}`,
        },
    });
};
