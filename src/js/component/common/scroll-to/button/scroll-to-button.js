import { htmlObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').ScrollToButtonType>} */
export const ScrollToButtonFn = ({ bindEffect, getSelfProxi }) => {
    const proxi = getSelfProxi();
    const isSectionClass = proxi.isSection ? 'is-section' : '';
    const isNoteClass = proxi.isNote ? 'is-note' : '';

    return htmlObject({
        tag: 'button',
        attributes: {
            type: 'button',
            tabindex: proxi.isSection || proxi.isNote ? '-1' : '0',
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
