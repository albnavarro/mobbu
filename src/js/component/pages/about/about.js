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
        const {
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section2_copy,
        } = getRef();

        const { destroy } = aboutAnimation({
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section2_copy,
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
                    <div class="l-about__section__top has-overflow">
                        <h1 class="title-big" ${setRef('title_1')}>
                            ${block_1.titleTop}
                        </h1>
                    </div>
                    <div class="l-about__section__bottom has-overflow">
                        <h1 class="title-big is-white" ${setRef('title_2')}>
                            ${block_1.titleBottom}
                        </h1>
                    </div>
                </section>
                <section class="l-about__section">
                    <div class="l-about__section__top has-overflow">
                        <div class="l-about__section__left"></div>
                        <div class="l-about__section__right">
                            <h1 class="title-big" ${setRef('section2_title')}>
                                ${block_2.title}
                            </h1>
                        </div>
                    </div>
                    <div class="l-about__section__bottom has-overflow">
                        <div class="l-about__section__right">
                            <p
                                class="l-about__section__copy is-white paragraph-big"
                                ${setRef('section2_copy')}
                            >
                                ${block_2.copy}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="l-about__section">
                    <h1>${block_3}</h1>
                </section>
                <section class="l-about__section">
                    <h1>${block_4}</h1>
                </section>
            </div>
        </div>
    </div>`;
};
