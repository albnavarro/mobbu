import footerShape from '../../../../svg/footer_shape_right.svg';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ html }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <mobjs-slot name="debug"></mobjs-slot>
                <div class="l-footer__shape-right">${footerShape}</div>
            </div>
        </footer>
    `;
};
