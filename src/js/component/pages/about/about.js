/**
 * @import { BindEffect, DelegateEvents, GetState, MobComponent, SetRef } from '../../../mobjs/type';
 **/

import { html } from '../../../mobjs';
import { aboutAnimation } from './animation';

/** @type{(value: number) => void} */
let _goTo = () => {};

/** @type{Record<number, number>} */
const goToPercentage = {
    1: 0,
    2: 100 / 3 + 3,
    3: (100 / 3) * 2 + 6,
    4: 100,
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block01 = ({ setRef, getState }) => {
    const { titleTop, titleBottom } = getState().block_1;

    return html`
        <section
            class="l-about__section l-about__section l-about__section--first "
        >
            <div class="l-about__section__top has-overflow">
                <h1 class="title-big" ${setRef('title_1')}>${titleTop}</h1>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <h1 class="title-biggest" ${setRef('title_2')}>
                    ${titleBottom}
                </h1>
            </div>
        </section>
    `;
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block02 = ({ setRef, getState }) => {
    const { title, copy } = getState().block_2;

    return html`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${setRef('section2_title')}>
                        ${title}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p
                        class="l-about__section__copy paragraph-big"
                        ${setRef('section2_copy')}
                    >
                        ${copy}
                    </p>
                </div>
            </div>
        </section>
    `;
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block03 = ({ setRef, getState }) => {
    const { title, copy } = getState().block_3;

    return html`
        <section class="l-about__section">
            <div class="l-about__section__top has-overflow">
                <div class="l-about__section__left"></div>
                <div class="l-about__section__right">
                    <h1 class="title-biggest" ${setRef('section3_title')}>
                        ${title}
                    </h1>
                </div>
            </div>
            <div class="l-about__section__bottom has-overflow">
                <div class="l-about__section__right">
                    <p
                        class="l-about__section__copy paragraph-big"
                        ${setRef('section3_copy')}
                    >
                        ${copy}
                    </p>
                </div>
            </div>
        </section>
    `;
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block04 = ({ setRef, getState }) => {
    const { title, items } = getState().block_4;

    return html`
        <section class="l-about__section l-about__section--last">
            <div class="l-about__section__top has-overflow">
                <h1 class="title-biggest" ${setRef('section4_title')}>
                    ${title}
                </h1>
            </div>
            <div class="l-about__section__bottom">
                <ul class="l-about__list">
                    ${items
                        .map((item) => {
                            return /* HTML */ `
                                <li ${setRef('inspirationItem')}>${item}</li>
                            `;
                        })
                        .join('')}
                </ul>
            </div>
        </section>
    `;
};

/**
 * @param {object} params
 * @param {import('./type').About['state']} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const navigation = ({ proxi, delegateEvents, bindEffect }) => {
    return html`
        <ul class="l-about__nav">
            ${proxi.navItem
                .map(({ index }) => {
                    return html`
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
                                        toggleClass: {
                                            active: () =>
                                                proxi.activenavItem === index,
                                        },
                                    })}
                                ></span>
                            </button>
                        </li>
                    `;
                })
                .join('')}
        </ul>
    `;
};

/** @type {MobComponent<import('./type').About>} */
export const AboutComponentFn = ({
    onMount,
    setRef,
    getRef,
    getRefs,
    getState,
    bindEffect,
    delegateEvents,
    getProxi,
}) => {
    const proxi = getProxi();
    const numberOfSection = 4;

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
            section4_title,
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
            section4_title,
            setActiveItem: (value) => {
                proxi.activenavItem = value;
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
            proxi.isMounted = true;
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
                toggleClass: {
                    'is-visible': () => proxi.isMounted,
                },
            })}
        >
            ${proxi.block_1.titleTop}
        </div>
        <span class="l-about__background"> </span>
        <div
            class="l-about__shape l-about__shape--back"
            ${setRef('pathElement')}
        ></div>
        <div
            class="l-about__shape l-about__shape--back"
            ${setRef('pathElement')}
        ></div>
        <div
            class="l-about__shape l-about__shape--front"
            ${setRef('pathElement')}
        ></div>
        <button
            type="button"
            class="l-about__arrow l-about__arrow--prev"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.activenavItem > 1,
                },
            })}
            ${delegateEvents({
                click: () => {
                    proxi.activenavItem -= 1;
                    _goTo(goToPercentage[proxi.activenavItem]);
                },
            })}
        >
            <span></span>
        </button>
        <button
            type="button"
            class="l-about__arrow l-about__arrow--next"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.activenavItem < 4,
                },
            })}
            ${delegateEvents({
                click: () => {
                    proxi.activenavItem += 1;
                    _goTo(goToPercentage[proxi.activenavItem]);
                },
            })}
        >
            <span></span>
        </button>
        <h6 class="l-about__scroll">Scroll or drag</h6>
        <div class="l-about__scroller" ${setRef('scrollerElement')}>
            <div class="l-about__wrap" ${setRef('wrapElement')}>
                ${block01({ setRef, getState })}
                ${block02({ setRef, getState })}
                ${block03({ setRef, getState })}
                ${block04({ setRef, getState })}
            </div>
        </div>
        ${navigation({ bindEffect, delegateEvents, proxi })}
    </div>`;
};
