/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocSide = ({ html }) => {
    return html`
        <div class="c-doc-side">
            <h2><mobjs-slot /></h2>
        </div>
    `;
};
