/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Spacer = async ({ html, getState }) => {
    const { style, line } = getState();
    const lineClass = line ? 'spacer--line' : '';

    return html`<div class="spacer spacer--${style} ${lineClass}"></div>`;
};
