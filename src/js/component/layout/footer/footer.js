/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ html }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <mobjs-slot name="debug"></mobjs-slot>
            </div>
        </footer>
    `;
};
