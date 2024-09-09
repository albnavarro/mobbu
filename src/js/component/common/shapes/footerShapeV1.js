//@ts-check

import { mobCore } from '../../../mobCore';

/**
 * @type {import("../../../mobjs/type").MobComponent<import('./type').FooterShapeV1>}
 */
export const FooterShapeV1Fn = ({ html, onMount, getState }) => {
    const { svg, position } = getState();
    const positionClass = `shape-v1--${position}`;

    onMount(({ element }) => {
        mobCore.useFrame(() => {
            element.classList.add('active');
        });

        return () => {};
    });

    return html` <div class="shape-v1 ${positionClass}">${svg}</div> `;
};
