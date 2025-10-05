/**
 * @import {BindEffect, DelegateEvents, GetState, MobComponent, SetRef} from '@mobJsType';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { aboutAnimation } from './animation';
import { aboutSvgAnimation } from './animation/svg-animation';

/** @type{(value: number) => void} */
let _goTo = () => {};

/**
 * @param {number} value
 * @returns {Promise<any>}
 */
let moveSvg = (value) => Promise.resolve(value);
let moveSvgFromNav = () => {};

/** @type{Record<number, number>} */
const goToPercentage = {
    1: 0,
    2: 100 / 3,
    3: (100 / 3) * 2,
    4: 100,
};

const bioInfo = [
    'Alberto Navarro',
    'Milan, Italy',
    '<a href="https://github.com/albnavarro/" target="_blank">github</a>',
    '<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">linkedin</a>',
];

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
                    <p class="l-about__section__copy">${copy}</p>
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
                    <p class="l-about__section__copy">${copy}</p>
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
            <div class="l-about__section__top">
                <h1 class="title-biggest" ${setRef('section4_title')}>
                    ${title}
                </h1>
            </div>
            <div class="l-about__section__bottom">
                <ul class="l-about__list">
                    ${items
                        .map((item) => {
                            return html` <li>[ ${item} ]</li> `;
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
                .map(({ index, label }) => {
                    return html`
                        <li class="l-about__nav__item">
                            <button
                                class="l-about__nav__button"
                                ${delegateEvents({
                                    click: () => {
                                        _goTo(goToPercentage[index]);
                                        moveSvgFromNav();
                                    },
                                })}
                                ${bindEffect({
                                    toggleClass: {
                                        active: () =>
                                            proxi.activenavItem === index,
                                    },
                                })}
                            >
                                [ ${label} ]
                            </button>
                        </li>
                    `;
                })
                .join('')}
        </ul>
    `;
};

/**
 * @returns {string}
 */
const getBio = () => {
    return html`
        <ul class="l-about__bio">
            <li class="l-about__bio__item">[</li>
            ${bioInfo
                .map((item) => {
                    return html` <li class="l-about__bio__item">${item}</li> `;
                })
                .join('')}
            <li class="l-about__bio__item">]</li>
        </ul>
    `;
};

/**
 * @returns {string}
 */
const getSquare = () => {
    return html`
        <div class="l-about__square">
            <div class="l-about__square__legend"><h4>Scroll or Drag</h4></div>
            <span class="l-about__square__angle top-left"></span>
            <span class="l-about__square__angle top-right"></span>
            <span class="l-about__square__angle bottom-left"></span>
            <span class="l-about__square__angle bottom-right"></span>
        </div>
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

    let freezeOnLag = false;

    onMount(() => {
        const {
            screenElement,
            scrollerElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section3_title,
            section4_title,
            pathElement,
        } = getRef();

        const { svg } = getRefs();

        let startpercent = 0;
        let isMoving = false;
        let svgShiftAmount = 0;

        /**
         * About svg animation
         */
        const { svgSpring, destroySvgSpring } = aboutSvgAnimation({
            elements: svg,
        });

        /**
         * Move about svg 1:1 with drag. Stop on fps slowdown.
         */
        moveSvg = async (value) => {
            const shouldStop = MobCore.shouldMakeSomething();

            if (shouldStop || freezeOnLag) {
                svgSpring.stop();
                freezeOnLag = true;
                setTimeout(() => {
                    freezeOnLag = false;
                }, 2000);

                return;
            }

            const valueParsed = -Math.abs(value / 30);
            await svgSpring.goTo({ x: valueParsed }).catch(() => {});
        };

        /**
         * Move about svg from nav handler.
         */
        moveSvgFromNav = () => {
            moveSvg(3000);

            setTimeout(() => {
                moveSvg(0);
            }, 500);
        };

        const { destroy, goTo } = aboutAnimation({
            screenElement,
            scrollerElement,
            pathElement,
            wrapElement,
            title_1,
            title_2,
            section2_title,
            section3_title,
            section4_title,
            setActiveItem: (value) => {
                proxi.activenavItem = value;
            },
            onMove: (value) => {
                if (!isMoving) {
                    startpercent = value;
                }

                isMoving = true;
                svgShiftAmount = startpercent - value;
                moveSvg(svgShiftAmount);
            },
            onScrollEnd: MobCore.useDebounce(() => {
                isMoving = false;
                svgShiftAmount = 0;
                moveSvg(svgShiftAmount);
            }, 500),
        });

        /**
         * Transfer goTo reference to _goTo that is visible by DOM element.
         */
        _goTo = goTo;
        proxi.isMounted = true;

        return () => {
            _goTo = () => {};
            destroy();
            destroySvgSpring();
        };
    });

    return html`<div
        class="l-about"
        style="--number-of-section:${numberOfSection}"
        ${bindEffect({
            toggleClass: {
                active: () => proxi.isMounted,
            },
        })}
    >
        <div>${getBio()}</div>
        <div class="l-about__sqaure-container">${getSquare()}</div>
        <span class="l-about__background">
            <div
                class="l-about__about-svg l-about__about-svg--bottom"
                ${setRef('svg')}
            >
                ${proxi.aboutSvg}
            </div>
        </span>
        <div
            class="l-about__about-svg l-about__about-svg--back"
            ${setRef('svg')}
        >
            ${proxi.aboutSvg}
        </div>
        <div
            class="l-about__shape l-about__shape--front"
            ${setRef('pathElement')}
        >
            <div class="l-about__about-svg l-about__about-svg--front">
                ${proxi.aboutSvg}
            </div>
        </div>
        <div class="l-about__screen" ${setRef('screenElement')}>
            <div class="l-about__scroller" ${setRef('scrollerElement')}>
                <div class="l-about__wrap" ${setRef('wrapElement')}>
                    ${block01({ setRef, getState })}
                    ${block02({ setRef, getState })}
                    ${block03({ setRef, getState })}
                    ${block04({ setRef, getState })}
                </div>
            </div>
        </div>
        ${navigation({ bindEffect, delegateEvents, proxi })}
    </div>`;
};
