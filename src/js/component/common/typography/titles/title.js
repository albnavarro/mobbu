/**
 * @type {import("../../../../mobjs/type").mobComponent<import("./type").Title>}
 */
export const TitleFn = ({ html, getState }) => {
    const { tag, color, isBold } = getState();
    const colorClass = `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';

    return html`<${tag} class="mob-title ${colorClass} ${boldClass}">
        <mobjs-slot/>
    </${tag}>`;
};
