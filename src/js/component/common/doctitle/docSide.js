/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocTitle = ({ html }) => {
    return html`
        <div class="c-doc-title">
            <h2><mobjs-slot /></h2>
        </div>
    `;
};
