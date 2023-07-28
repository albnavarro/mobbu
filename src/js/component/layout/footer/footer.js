/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Footer = ({ render }) => {
    return render(/* HTML */ `
        <footer class="l-footer">
            <div class="l-footer__container">
                <slot data-slotname="debug"></slot>
            </div>
        </footer>
    `);
};
