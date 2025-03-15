//@ts-check

import { html } from '../../../../mobjs';

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").HorizontalScrollerButton>} */
export const HorizontalScrollerButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return html`
        <li>
            <button
                type="button"
                data-id="${proxi.id}"
                class="l-h-scroller__nav__btn"
                ${bindEffect({
                    toggleClass: { active: () => proxi.active },
                })}
            >
                ${proxi.id}
            </button>
        </li>
    `;
};
