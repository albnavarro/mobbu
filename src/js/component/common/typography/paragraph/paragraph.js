/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const ParagraphFn = ({ html, getState }) => {
    const { style, color } = getState();
    const colorClass = `is-${color}`;

    return html`<p class="p p--${style} ${colorClass}">
        <mobjs-slot />
    </p>`;
};
