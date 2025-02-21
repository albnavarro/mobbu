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
    const { title } = getState();
    const numberOfSection = 5;

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
            <section class="l-about__section">${title}</section>
            <section class="l-about__section">${title}</section>
            <section class="l-about__section">${title}</section>
            <section class="l-about__section">${title}</section>
        </div>
    </div>`;
};
