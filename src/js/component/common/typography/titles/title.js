/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Title = ({ html, getState }) => {
    const { tag, color, isBold } = getState();
    const colorClass = `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';

    return html`<${tag} class="mob-title ${colorClass} ${boldClass}">
        <mobjs-slot/>
    </${tag}>`;
};
