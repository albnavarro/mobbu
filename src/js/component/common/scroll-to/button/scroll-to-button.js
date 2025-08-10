import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').ScrollToButton>} */
export const ScrollToButtonFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();
    const isSectionClass = proxi.isSection ? 'is-section' : '';

    return html`
        <button
            type="button"
            class="${isSectionClass}"
            ${bindEffect({
                toggleClass: { active: () => proxi.active },
            })}
        >
            <span>${proxi.label}</span>
        </button>
    `;
};
