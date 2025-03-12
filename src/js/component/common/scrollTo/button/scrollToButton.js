//@ts-check

import { html } from '../../../../mobjs';

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").ScrollToButton>} */
export const ScrollToButtonFn = ({ getState, bindEffect }) => {
    const { label } = getState();

    return html`
        <button
            type="button"
            ${bindEffect({
                bind: 'active',
                toggleClass: { active: () => getState().active },
            })}
        >
            <span> ${label}</span>
        </button>
    `;
};
