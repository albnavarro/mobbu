import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicListButtonType>} */
export const DynamicListButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: 'c-dynamic-list-button',
        modules: bindEffect({
            observe: 'active',
            toggleClass: { active: () => proxi.active },
        }),
        content: proxi.label,
    });
};
