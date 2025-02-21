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
    const { block_1, block_2, block_3, block_4 } = getState();
    const numberOfSection = 4;

    onMount(() => {
        const { screenElement, scrollerElement, pathElement, wrapElement } =
            getRef();
        const { destroy } = aboutAnimation({
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
        });

        return () => {
            destroy();
        };
    });

    return html`<div
        class="l-about"
        ${setRef('screenElement')}
        style="--number-of-section:${numberOfSection}"
    >
        <div class="l-about__background" ${setRef('pathElement')}></div>
        <div class="l-about__scroller" ${setRef('scrollerElement')}>
            <div class="l-about__wrap" ${setRef('wrapElement')}>
                <section class="l-about__section"><h1>${block_1}</h1></section>
                <section class="l-about__section"><h1>${block_2}</h1></section>
                <section class="l-about__section"><h1>${block_3}</h1></section>
                <section class="l-about__section"><h1>${block_4}</h1></section>
            </div>
        </div>
    </div>`;
};
