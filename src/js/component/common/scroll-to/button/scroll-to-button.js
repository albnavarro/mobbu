import { fromObject } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').ScrollToButtonType>} */
export const ScrollToButtonFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();
    const isSectionClass = proxi.isSection ? 'is-section' : '';
    const isNoteClass = proxi.isNote ? 'is-note' : '';

    return fromObject({
        tag: 'button',
        attributes: { type: 'button' },
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
