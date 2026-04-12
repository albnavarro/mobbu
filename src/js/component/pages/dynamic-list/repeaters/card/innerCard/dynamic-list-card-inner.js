import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicListCardInnerType>} */
export const DynamicListCardInnerFn = ({ bindText }) => {
    return fromObject({
        tag: 'span',
        className: 'c-dynamic-list-card-inner',
        content: {
            tag: 'span',
            content: bindText`${'key'}`,
        },
    });
};
