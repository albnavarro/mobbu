/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Spacer = async ({ html, getState }) => {
    const { style } = getState();
    console.log(style);

    return html`<div class="spacer spacer--${style}"></div>`;
};
