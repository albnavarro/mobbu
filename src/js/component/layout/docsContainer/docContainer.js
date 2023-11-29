/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocContainer = ({ html }) => {
    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side">
                <mobjs-slot name="side"></mobjs-slot>
            </div>
        </div>
    `;
};
