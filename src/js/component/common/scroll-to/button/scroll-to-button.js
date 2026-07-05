import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').ScrollToButtonType>} */
export const ScrollToButtonFunction = ({ bindEffect, getSelfProxi }) => {
    const proxi = getSelfProxi();
    const isSectionClass = proxi.isSection ? 'is-section' : '';
    const isNoteClass = proxi.isNote ? 'is-note' : '';

    return htmlObject({
        tag: proxi.isNote ? 'span' : 'button',
        attributes: {
            type: proxi.isNote ? null : 'button',
            tabindex: proxi.isSection ? '-1' : null,
            role: proxi.isNote ? null : 'link',
        },
        className: [isSectionClass, isNoteClass],
        modules: bindEffect({
            toggleClass: { active: () => proxi.active },
        }),
        content: {
            tag: 'span',
            content: proxi.label,
        },
    });
};
