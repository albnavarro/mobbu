import { mobCore } from '../../../mobCore';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const FooterShaperV1 = ({ html, onMount, getState }) => {
    const { svg, position } = getState();
    const positionClass = `shape-${position}`;

    onMount(({ refs }) => {
        const { shape } = refs;

        mobCore.useFrame(() => {
            shape.classList.add('active');
        });
    });

    return html`
        <div>
            <div class="shape ${positionClass}" ref="shape">${svg}</div>
        </div>
    `;
};
