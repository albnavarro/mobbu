/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ html, slotName }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <mobjs-slot ${slotName('debug')}></mobjs-slot>
            </div>
        </footer>
    `;
};
