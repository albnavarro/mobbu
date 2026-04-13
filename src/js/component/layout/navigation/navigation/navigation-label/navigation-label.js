import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationLabelType>} */
export const NavigationLabelFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        className: 'label',
        dataAttributes: { sectionname: proxi.sectioName },
        modules: bindEffect({
            toggleClass: {
                active: () =>
                    proxi.sectioName === proxi.activeNavigationSection,
                hide: () => !!proxi.hide,
            },
        }),
        content: proxi.label,
    });
};
