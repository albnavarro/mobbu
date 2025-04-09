//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').DynamicListCardInner>} */
export const DynamicListCardInnerFn = ({ bindText }) => {
    return html`<span class="dynamic-list-card-inner">
        <span>${bindText`${'key'}`}</span>
    </span>`;
};
