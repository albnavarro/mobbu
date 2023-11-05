/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Title = ({ html, getState }) => {
    const { tag } = getState();

    return html`<${tag} class="mob-title">
        <mobjs-slot/>
    </${tag}>`;
};
