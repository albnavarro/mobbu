/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Title = ({ html, getState }) => {
    const { tag, color, onlyMob } = getState();
    const colorClass = `is-${color}`;
    const isMobClass = onlyMob ? `is-mobile` : '';

    return html`<${tag} class="mob-title ${colorClass} ${isMobClass}">
        <mobjs-slot/>
    </${tag}>`;
};
