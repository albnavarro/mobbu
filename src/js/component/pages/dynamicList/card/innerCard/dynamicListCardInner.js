//@ts-check

import { html } from '../../../../../mobjs';

/** @type {import("../../../../../mobjs/type").MobComponent<import("./type").DynamicListCardInner>} */
export const DynamicListCardInnerFn = ({ bindText }) => {
    return html`<span class="dynamic-list-card-inner">
        <span>${bindText`${'key'}`}</span>
    </span>`;
};
