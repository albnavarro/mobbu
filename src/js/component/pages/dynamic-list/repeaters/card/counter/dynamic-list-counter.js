//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicCounter>} */
export const DynamicListCounterFn = ({ getState, bindText }) => {
    const { parentListId } = getState();

    return html`<div class="c-dynamic-counter">
        <p class="title">Nested:</p>
        <p class="subtitle">(slotted)</p>
        <p class="list">list index: ${parentListId}</p>
        <span>${bindText`${'counter'}`}</span>
    </div>`;
};
