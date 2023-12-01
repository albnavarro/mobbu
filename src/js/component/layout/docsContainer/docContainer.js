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
                <doc-scroll></doc-scroll>
                <doc-top></doc-top>
                <mobjs-slot name="section-title"></mobjs-slot>
                <scroll-to></scroll-to>
            </div>
        </div>
    `;
};
