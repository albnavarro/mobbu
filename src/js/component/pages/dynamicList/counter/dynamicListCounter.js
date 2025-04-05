//@ts-check

import { html } from '../../../../mob/mobjs';

/** @type {import('../../../../mob/mobjs/type').MobComponent<import('./type').DynamicCounter>} */
export const DynamicListCounterFn = ({ getState, bindText }) => {
    const { parentListId } = getState();

    return html`<div class="dynamic-counter">
        <p class="c-dynamic-counter__title">Nested:</p>
        <p class="c-dynamic-counter__subtitle">(slotted)</p>
        <p class="c-dynamic-counter__list">list index: ${parentListId}</p>
        <span>${bindText`${'counter'}`}</span>
    </div>`;
};
