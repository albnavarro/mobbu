//@ts-check

/** @type {import("../../../../../mobjs/type").MobComponent<import("./type").DynamicListCardInner>} */
export const DynamicListCardInnerFn = ({ html, bindText }) => {
    return html`<span class="dynamic-list-card-inner">
        <span>${bindText`${'key'}`}</span>
    </span>`;
};
