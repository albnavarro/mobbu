//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { FooterShapeV1 } from './type';
 **/

import { mobCore } from '../../../mobCore';

/** @type {MobComponent<FooterShapeV1>} */
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
