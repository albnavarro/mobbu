//@ts-check

import { html } from '../../../../mob/mobjs';

/** @type {import('../../../../mob/mobjs/type').MobComponent<import('./type').DynamicListButton>} */
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
