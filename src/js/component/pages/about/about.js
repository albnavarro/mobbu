/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

import { Triangles } from '../../common/scrollToTop/triangles';
import { aboutAnimation } from './animation';

/** @type{(value: number) => void} */
let _goTo = () => {};

/** @type{Record<number, number>} */
const goToPercentage = {
    1: 0,
    2: 25,
    3: 65,
    4: 100,
};

/** @type {MobComponent<import('./type').About>} */
export const AboutComponentFn = ({
    html,
    onMount,
    setRef,
    getRef,
    getRefs,
    getState,
    setState,
    bindEffect,
    delegateEvents,
}) => {
    const { block_1, block_2, block_3, block_4 } = getState();
    const numberOfSection = 3;

    onMount(() => {
        const {
            screenElement,
            scrollerElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section2_copy,
            section3_title,
            section3_copy,
        } = getRef();

        const { inspirationItem, pathElement } = getRefs();

        const { destroy, goTo } = aboutAnimation({
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section2_copy,
            section3_title,
            section3_copy,
            inspirationItem,
            shouldRotateArrow: (value) => {
                setState('arrowShouldReverse', value);
            },
            setActiveItem: (value) => {
                setState('activenavItem', value);
            },
        });

        /**
         * Transfer goTo reference to _goTo that is visible by DOM element.
         */
        _goTo = goTo;

        /**
         * Stagger start later, so show path in background later.
         */
        setTimeout(() => {
            setState('isMounted', true);
        }, 500);

        return () => {
            _goTo = () => {};
            destroy();
        };
    });

    return html`<div
        class="l-about"
        ${setRef('screenElement')}
        style="--number-of-section:${numberOfSection}"
    >
        <div
            class="l-about__back-title is-white"
            ${bindEffect({
                bind: 'isMounted',
                toggleClass: {
                    'is-visible': () => getState().isMounted,
                },
            })}
        >
            ${block_1.titleTop}
        </div>
        <span class="l-about__background"></span>
        <div
            class="l-about__shape l-about__shape--back"
            ${setRef('pathElement')}
            ${bindEffect({
                bind: 'isMounted',
                toggleClass: {
                    'is-visible': () => getState().isMounted,
                },
            })}
        ></div>
        <div
            class="l-about__shape l-about__shape--back"
            ${setRef('pathElement')}
            ${bindEffect({
                bind: 'isMounted',
                toggleClass: {
                    'is-visible': () => getState().isMounted,
                },
            })}
        ></div>
        <div
            class="l-about__shape"
            ${setRef('pathElement')}
            ${bindEffect({
                bind: 'isMounted',
                toggleClass: {
                    'is-visible': () => getState().isMounted,
                },
            })}
        ></div>
        <span
            class="l-about__arrow"
            ${bindEffect({
                bind: 'arrowShouldReverse',
                toggleClass: {
                    reverse: () => getState().arrowShouldReverse,
                },
            })}
        ></span>
        <div class="l-about__triangle-1">${Triangles}</div>
        <div class="l-about__triangle-2">${Triangles}</div>
        <h6 class="l-about__scroll">Scroll or drag</h6>
        <div class="l-about__scroller" ${setRef('scrollerElement')}>
            <div class="l-about__wrap" ${setRef('wrapElement')}>
                <section
                    class="l-about__section l-about__section l-about__section--first "
                >
                    <div class="l-about__section__top has-overflow">
                        <h1 class="title-big" ${setRef('title_1')}>
                            ${block_1.titleTop}
                        </h1>
                    </div>
                    <div class="l-about__section__bottom has-overflow">
                        <h1 class="title-big" ${setRef('title_2')}>
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
                                class="l-about__section__copy paragraph-big"
                                ${setRef('section2_copy')}
                            >
                                ${block_2.copy}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="l-about__section">
                    <div class="l-about__section__top has-overflow">
                        <div class="l-about__section__left"></div>
                        <div class="l-about__section__right">
                            <h1 class="title-big" ${setRef('section3_title')}>
                                ${block_3.title}
                            </h1>
                        </div>
                    </div>
                    <div class="l-about__section__bottom has-overflow">
                        <div class="l-about__section__right">
                            <p
                                class="l-about__section__copy paragraph-big"
                                ${setRef('section3_copy')}
                            >
                                ${block_3.copy}
                            </p>
                        </div>
                    </div>
                </section>
                <section class="l-about__section l-about__section--last">
                    <div class="l-about__section__top has-overflow">
                        <h1 class="title-big" ${setRef('section3_title')}>
                            ${block_4.title}
                        </h1>
                    </div>
                    <div class="l-about__section__bottom">
                        <ul class="l-about__list">
                            ${block_4.items
                                .map((item) => {
                                    return /* HTML */ `
                                        <li ${setRef('inspirationItem')}>
                                            ${item}
                                        </li>
                                    `;
                                })
                                .join('')}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <ul class="l-about__nav">
            ${getState()
                .navItem.map(({ index }) => {
                    return /* HTML */ `
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${delegateEvents({
                                    click: () => {
                                        _goTo(goToPercentage[index]);
                                    },
                                })}
                            >
                                <span
                                    class="l-about__nav__dot"
                                    ${bindEffect({
                                        bind: 'activenavItem',
                                        toggleClass: {
                                            active: () =>
                                                getState().activenavItem ===
                                                index,
                                        },
                                    })}
                                ></span>
                            </button>
                        </li>
                    `;
                })
                .join('')}
        </ul>
    </div>`;
};
