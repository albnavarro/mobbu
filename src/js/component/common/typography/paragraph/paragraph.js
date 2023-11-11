/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Paragraph = ({ html, getState }) => {
    const { style } = getState();

    return html`<p class="p p--${style}">
        <mobjs-slot />
    </p>`;
};
