/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ html, slotName }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <slot ${slotName('debug')}></slot>
            </div>
        </footer>
    `;
};
