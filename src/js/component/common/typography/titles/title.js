/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Title = ({ html, getState }) => {
    const { tag, color } = getState();
    const colorClass = `is-${color}`;

    return html`<${tag} class="mob-title ${colorClass}">
        <mobjs-slot/>
    </${tag}>`;
};
