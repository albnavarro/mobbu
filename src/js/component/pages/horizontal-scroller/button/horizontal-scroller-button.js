//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').HorizontalScrollerButton>} */
export const HorizontalScrollerButtonFn = ({ getProxi }) => {
    const proxi = getProxi();

    return html`
        <li class="nav-item">
            <button type="button" data-id="${proxi.id}" class="nav-button">
                ${proxi.id}
            </button>
        </li>
    `;
};
