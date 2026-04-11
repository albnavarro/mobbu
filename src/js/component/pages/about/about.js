/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetState,
 *   MobComponent,
 *   SetRef
 * } from "@mobJsType"
 */

import { MobCore } from '@mobCore';
import { fromObject } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
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

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block01 = ({ setRef, getState }) => {
    const { titleTop, titleBottom } = getState().block_1;

    return fromObject({
        className: 'section section--first ',
        content: [
            {
                className: 'section-top u-has-overflow',
                content: {
                    tag: 'h1',
                    className: 'title-big',
                    modules: setRef('title_1'),
                    content: titleTop,
                },
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    tag: 'h1',
                    className: 'title-biggest',
                    modules: setRef('title_2'),
                    content: titleBottom,
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block02 = ({ setRef, getState }) => {
    const { title, copy } = getState().block_2;

    return fromObject({
        className: 'section',
        content: [
            {
                className: 'section-top u-has-overflow',
                content: [
                    {
                        className: 'section-left',
                    },
                    {
                        className: 'section-right',
                        content: {
                            tag: 'h1',
                            className: 'title-biggest',
                            modules: setRef('section2_title'),
                            content: title,
                        },
                    },
                ],
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    className: 'section-right',
                    content: {
                        tag: 'p',
                        className: 'section-copy',
                        content: copy,
                    },
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block03 = ({ setRef, getState }) => {
    const { title, copy } = getState().block_3;

    return fromObject({
        className: 'section',
        content: [
            {
                className: 'section-top u-has-overflow',
                content: [
                    {
                        className: 'section-left',
                    },
                    {
                        className: 'section-right',
                        content: {
                            tag: 'h1',
                            className: 'title-biggest',
                            modules: setRef('section3_title'),
                            content: title,
                        },
                    },
                ],
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    className: 'section-right',
                    content: {
                        tag: 'p',
                        className: 'section-copy',
                        content: copy,
                    },
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {GetState<import('./type').About>} params.getState
 */
const block04 = ({ setRef, getState }) => {
    const { title, items } = getState().block_4;

    return fromObject({
        className: 'section section--last',
        content: [
            {
                className: 'section-top u-has-overflow',
                content: {
                    tag: 'h1',
                    className: 'title-biggest',
                    modules: setRef('section4_title'),
                    content: title,
                },
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    tag: 'ul',
                    className: 'section-list',
                    content: items
                        .map((item) => {
                            return fromObject({
                                tag: 'li',
                                className: 'section-list-item',
                                content: `[ ${item} ]`,
                            });
                        })
                        .join(''),
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {import('./type').About['state']} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const navigation = ({ proxi, delegateEvents, bindEffect }) => {
    return fromObject({
        tag: 'ul',
        className: 'nav',
        content: proxi.navItem
            .map(({ index, label }) => {
                return fromObject({
                    tag: 'li',
                    className: 'nav-item',
                    content: {
                        tag: 'button',
                        className: 'nav-button',
                        modules: [
                            delegateEvents({
                                click: () => {
                                    _goTo(goToPercentage[index]);
                                    moveSvgFromNav();
                                },
                            }),
                            bindEffect({
                                toggleClass: {
                                    active: () => proxi.activenavItem === index,
                                },
                            }),
                        ],
                        content: label,
                    },
                });
            })
            .join(''),
    });
};

/**
 * @returns {string}
 */
const getSquare = () => {
    return fromObject({
        className: 'square',
        content: [
            {
                tag: 'div',
                className: 'square-legend',
                content: {
                    tag: 'h4',
                    content: 'Scroll or Drag',
                },
            },
            {
                tag: 'span',
                className: 'square-angle top-left',
            },
            {
                tag: 'span',
                className: 'square-angle top-right',
            },
            {
                tag: 'span',
                className: 'square-angle bottom-left',
            },
            {
                tag: 'span',
                className: 'square-angle bottom-right',
            },
        ],
    });
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
            if (Number.isNaN(valueParsed)) return;

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
            snapPoints: Object.values(goToPercentage),
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

    /**
     * Prev buttons modules
     */
    const prevModules = [
        bindEffect({
            toggleAttribute: {
                disabled: () => proxi.activenavItem == 1,
            },
        }),
        delegateEvents({
            click: () => {
                _goTo(
                    goToPercentage[
                        MobMotionCore.clamp(proxi.activenavItem - 1, 1, 4)
                    ]
                );
                moveSvgFromNav();
            },
        }),
    ];

    /**
     * Next buttons modules
     */
    const nextModules = [
        bindEffect({
            toggleAttribute: {
                disabled: () => proxi.activenavItem == 4,
            },
        }),
        delegateEvents({
            click: () => {
                _goTo(
                    goToPercentage[
                        MobMotionCore.clamp(proxi.activenavItem + 1, 1, 4)
                    ]
                );
                moveSvgFromNav();
            },
        }),
    ];

    return fromObject({
        className: 'l-about',
        style: `--number-of-section:${numberOfSection}`,
        modules: bindEffect({
            toggleClass: {
                active: () => proxi.isMounted,
            },
        }),
        content: [
            {
                content: getSquare(),
            },
            {
                className: 'background',
                content: {
                    className: 'svg-container svg-container--bottom',
                    modules: setRef('svg'),
                    content: proxi.aboutSvg,
                },
            },
            {
                className: 'svg-container svg-container--back',
                modules: setRef('svg'),
                content: proxi.aboutSvg,
            },
            {
                className: 'shape',
                modules: setRef('pathElement'),
                content: {
                    className: 'svg-container svg-container--front',
                    content: proxi.aboutSvg,
                },
            },
            {
                className: 'screen',
                modules: setRef('screenElement'),
                content: {
                    className: 'scrollable-element',
                    modules: setRef('scrollerElement'),
                    content: {
                        className: 'scollable-container',
                        modules: setRef('wrapElement'),
                        content: [
                            block01({ setRef, getState }),
                            block02({ setRef, getState }),
                            block03({ setRef, getState }),
                            block04({ setRef, getState }),
                        ],
                    },
                },
            },
            {
                tag: 'button',
                className: 'prev',
                modules: prevModules,
            },
            navigation({ bindEffect, delegateEvents, proxi }),
            {
                tag: 'button',
                className: 'next',
                modules: nextModules,
            },
        ],
    });
};
