/**
 * @type {import("../../../mobjs/type").mobComponent}
 */
export const FooterFn = ({ html }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <mobjs-slot name="debug"></mobjs-slot>
            </div>
        </footer>
    `;
};
