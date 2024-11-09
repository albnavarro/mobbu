//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { FooterShapeV1 } from './type';
 **/

import { mobCore } from '../../../mobCore';

/** @type {MobComponent<FooterShapeV1>} */
export const FooterShapeV1Fn = ({
    html,
    onMount,
    getState,
    watchSync,
    setState,
    addMethod,
}) => {
    const { svg, position } = getState();
    const positionClass = `shape-v1--${position}`;

    addMethod('setPosition', ({ position }) => {
        if (position === 'center') {
            setState('isCenter', true);
            return;
        }

        setState('isCenter', false);
    });

    onMount(({ element }) => {
        mobCore.useFrame(() => {
            element.classList.add('active');
        });

        watchSync('isCenter', (isCenter) => {
            element.classList.toggle('is-center', isCenter);
        });

        return () => {};
    });

    return html` <div class="shape-v1 ${positionClass}">${svg}</div> `;
};
