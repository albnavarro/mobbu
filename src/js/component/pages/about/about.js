/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

import { aboutAnimation } from './animation';

/** @type {MobComponent<import('./type').About>} */
export const AboutComponentFn = ({
    html,
    onMount,
    getState,
    setRef,
    getRef,
}) => {
    const { title, block_1, block_2, block_3 } = getState();
    const numberOfSection = 4;

    onMount(() => {
        const { screen, scroller } = getRef();
        const { destroy } = aboutAnimation({ screen, scroller });

        return () => {
            destroy();
        };
    });

    return html`<div
        class="l-about"
        ${setRef('screen')}
        style="--number-of-section:${numberOfSection}"
    >
        <div class="l-about__scroller" ${setRef('scroller')}>
            <section class="l-about__section">${title}</section>
            <section class="l-about__section">${block_1}</section>
            <section class="l-about__section">${block_2}</section>
            <section class="l-about__section">${block_3}</section>
        </div>
    </div>`;
};
