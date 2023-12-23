import shapeSvg from '../../../../svg/footer_shape_left.svg';
import { mobCore } from '../../../mobCore';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const ShapeLeft = ({ html, onMount }) => {
    onMount(({ refs }) => {
        const { shape } = refs;

        mobCore.useFrame(() => {
            shape.classList.add('active');
        });
    });

    return html`
        <div>
            <div class="shape shape-left" ref="shape">${shapeSvg}</div>
        </div>
    `;
};
