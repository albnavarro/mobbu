import footerShape from '../../../../svg/footer_shape_right.svg';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ShapeRight = ({ html }) => {
    return html`
        <div>
            <div class="shape-right">${footerShape}</div>
        </div>
    `;
};
