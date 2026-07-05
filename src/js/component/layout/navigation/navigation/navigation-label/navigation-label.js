import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').NavigationLabelType>} */
export const NavigationLabelFunction = ({
    bindEffect,
    getSelfProxi,
    getBoundedProxi,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    return htmlObject({
        className: 'label',
        dataAttributes: { sectionname: proxi.sectioName },
        modules: bindEffect({
            toggleClass: {
                active: () =>
                    proxi.sectioName === boundedProxi.activeNavigationSection,
                hide: () => !!proxi.hide,
            },
        }),
        content: proxi.label,
    });
};
