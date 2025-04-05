//@ts-check

import { html } from '../../../../mob/mobjs';

/** @type {import("../../../../mob/mobjs/type").MobComponent<import("./type").ScrollToButton>} */
export const ScrollToButtonFn = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return html`
        <button
            type="button"
            ${bindEffect({
                toggleClass: { active: () => proxi.active },
            })}
        >
            <span>${proxi.label}</span>
        </button>
    `;
};
