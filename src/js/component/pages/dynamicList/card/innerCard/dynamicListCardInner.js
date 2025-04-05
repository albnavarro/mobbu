//@ts-check

import { html } from '../../../../../mob/mobjs';

/** @type {import("../../../../../mob/mobjs/type").MobComponent<import("./type").DynamicListCardInner>} */
export const DynamicListCardInnerFn = ({ bindText }) => {
    return html`<span class="dynamic-list-card-inner">
        <span>${bindText`${'key'}`}</span>
    </span>`;
};
