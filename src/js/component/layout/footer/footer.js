/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ render, slotName }) => {
    return render(/* HTML */ `
        <footer class="l-footer">
            <div class="l-footer__container">
                <slot ${slotName('debug')}></slot>
            </div>
        </footer>
    `);
};
