import { mobCore } from '../../../mobCore';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const FooterShapeV1Fn = ({ html, onMount, getState }) => {
    const { svg, position } = getState();
    const positionClass = `shape-v1--${position}`;

    onMount(({ element }) => {
        mobCore.useFrame(() => {
            element.classList.add('active');
        });
    });

    return html` <div class="shape-v1 ${positionClass}">${svg}</div> `;
};
