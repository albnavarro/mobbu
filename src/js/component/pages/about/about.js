/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

import { html } from '../../../mobjs';
import { aboutAnimation } from './animation';

const getAngles = () => {
    return html`
        <span class="l-about__angles-top-left"></span>
        <span class="l-about__angles-top-right"></span>
        <span class="l-about__angles-bottom-left"></span>
        <span class="l-about__angles-bottom-right"></span>
    `;
};

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
        const {
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            title_3,
            title_4,
        } = getRef();

        const { destroy } = aboutAnimation({
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            title_3,
            title_4,
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
        <span class="l-about__background"></span>
        <div class="l-about__shape" ${setRef('pathElement')}></div>
        <span class="l-about__arrow"></span>
        <div class="l-about__scroller" ${setRef('scrollerElement')}>
            <div class="l-about__wrap" ${setRef('wrapElement')}>
                <section class="l-about__section l-about__section__1 ">
                    ${getAngles()}
                    <div class="l-about__section__1__top has-overflow">
                        <h1 class="title-big" ${setRef('title_1')}>
                            ${block_1.titleTop}
                        </h1>
                    </div>
                    <div class="l-about__section__1__bottom has-overflow">
                        <h1 class="title-big is-white" ${setRef('title_2')}>
                            ${block_1.titleBottom}
                        </h1>
                    </div>
                </section>
                <section class="l-about__section">
                    ${getAngles()}
                    <div class="l-about__section__2__top has-overflow">
                        <h1 class="title-big" ${setRef('title_3')}>
                            ${block_2.titleTop}
                        </h1>
                    </div>
                    <div class="l-about__section__2__bottom has-overflow">
                        <h1 class="title-big is-white" ${setRef('title_4')}>
                            ${block_2.titleBottom}
                        </h1>
                    </div>
                </section>
                <section class="l-about__section">
                    ${getAngles()}
                    <h1>${block_3}</h1>
                </section>
                <section class="l-about__section">
                    ${getAngles()}
                    <h1>${block_4}</h1>
                </section>
            </div>
        </div>
    </div>`;
};
