/**
 * @import { BindEffect, DelegateEvents, GetState, MobComponent, SetRef } from '../../../mobjs/type';
 **/

import { html } from '../../../mobjs';
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
                <h1 class="title-big" ${setRef('title_2')}>${titleBottom}</h1>
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
                    <h1 class="title-big" ${setRef('section2_title')}>
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
                    <h1 class="title-big" ${setRef('section3_title')}>
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
                <h1 class="title-big" ${setRef('section3_title')}>${title}</h1>
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
 * @param {GetState<import('./type').About>} params.getState
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const navigation = ({ getState, delegateEvents, bindEffect }) => {
    const { navItem } = getState();

    return html`
        <ul class="l-about__nav">
            ${navItem
                .map(({ index }) => {
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
    `;
};

/** @type {MobComponent<import('./type').About>} */
export const AboutComponentFn = ({
    onMount,
    setRef,
    getRef,
    getRefs,
    getState,
    setState,
    updateState,
    bindEffect,
    delegateEvents,
}) => {
    const { block_1 } = getState();
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
        <span class="l-about__background">
            <div class="l-about__top-title">${block_1.titleTop}</div>
        </span>
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
        <button
            type="button"
            class="l-about__arrow l-about__arrow--prev"
            ${bindEffect({
                bind: 'activenavItem',
                toggleClass: {
                    active: () => getState().activenavItem > 1,
                },
            })}
            ${delegateEvents({
                click: () => {
                    updateState('activenavItem', (value) => value - 1);
                    _goTo(goToPercentage[getState().activenavItem]);
                },
            })}
        >
            <span></span>
        </button>
        <button
            type="button"
            class="l-about__arrow l-about__arrow--next"
            ${bindEffect({
                bind: 'activenavItem',
                toggleClass: {
                    active: () => getState().activenavItem < 4,
                },
            })}
            ${delegateEvents({
                click: () => {
                    updateState('activenavItem', (value) => value + 1);
                    _goTo(goToPercentage[getState().activenavItem]);
                },
            })}
        >
            <span></span>
        </button>
        <div class="l-about__triangle-1">${Triangles}</div>
        <div class="l-about__triangle-2">${Triangles}</div>
        <h6 class="l-about__scroll">Scroll or drag</h6>
        <div class="l-about__scroller" ${setRef('scrollerElement')}>
            <div class="l-about__wrap" ${setRef('wrapElement')}>
                ${block01({ setRef, getState })}
                ${block02({ setRef, getState })}
                ${block03({ setRef, getState })}
                ${block04({ setRef, getState })}
            </div>
        </div>
        ${navigation({ bindEffect, delegateEvents, getState })}
    </div>`;
};
