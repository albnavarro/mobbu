//@ts-check

import { html } from '../../../../mobjs';

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").HorizontalScrollerButton>} */
export const HorizontalScrollerButtonFn = ({ getState, bindEffect }) => {
    const { id } = getState();

    return html`
        <li>
            <button
                type="button"
                data-id="${id}"
                class="l-h-scroller__nav__btn"
                ${bindEffect({
                    bind: 'active',
                    toggleClass: { active: () => getState().active },
                })}
            >
                ${id}
            </button>
        </li>
    `;
};
