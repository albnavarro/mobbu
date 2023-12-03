/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocTitleSmall = ({ html }) => {
    return html`
        <div class="c-doc-title-small">
            <h3><mobjs-slot /></h3>
        </div>
    `;
};
