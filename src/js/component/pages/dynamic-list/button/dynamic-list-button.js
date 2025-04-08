//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicListButton>} */
export const DynamicListButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return html`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${bindEffect({
                bind: 'active',
                toggleClass: { active: () => proxi.active },
            })}
        >
            ${proxi.label}
        </button>
    `;
};
