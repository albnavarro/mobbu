import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').ScrollToButton>} */
export const ScrollToButtonFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();
    const isSectionClass = proxi.isSection ? 'is-section' : '';
    const isNoteClass = proxi.isNote ? 'is-note' : '';

    return html`
        <button
            type="button"
            class="${isSectionClass} ${isNoteClass}"
            ${bindEffect({
                toggleClass: { active: () => proxi.active },
            })}
        >
            <span>${proxi.label}</span>
        </button>
    `;
};
