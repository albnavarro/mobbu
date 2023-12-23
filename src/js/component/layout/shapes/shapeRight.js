import footerShape from '../../../../svg/footer_shape_right.svg';
import { mobCore } from '../../../mobCore';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ShapeRight = ({ html, onMount }) => {
    onMount(({ refs }) => {
        const { shape } = refs;

        mobCore.useFrame(() => {
            shape.classList.add('active');
        });
    });

    return html`
        <div>
            <div class="shape shape-right" ref="shape">${footerShape}</div>
        </div>
    `;
};
