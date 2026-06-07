/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState,
 *   SetRef
 * } from '@mobJsType'
 */

import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
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
 * @param {ProxiSelfState<import('./type').About>} params.proxi
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const block01 = ({ setRef, proxi, bindEffect }) => {
    return htmlObject({
        className: 'section section--first ',
        attributes: {
            id: 'slide-1',
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': 'Slide 1 di 4',
        },
        modules: bindEffect({
            toggleAttribute: {
                hidden: () => proxi.activenavItem !== 1,
            },
        }),
        content: [
            {
                className: 'section-top u-has-overflow',
                content: {
                    tag: 'h1',
                    attributes: { tabindex: '-1' },
                    className: 'title-big',
                    modules: setRef('title_1'),
                    content: proxi.block_1.titleTop,
                },
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    tag: 'h2',
                    className: 'title-biggest',
                    modules: setRef('title_2'),
                    content: proxi.block_1.titleBottom,
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {ProxiSelfState<import('./type').About>} params.proxi
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const block02 = ({ setRef, proxi, bindEffect }) => {
    return htmlObject({
        className: 'section',
        attributes: {
            id: 'slide-2',
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': 'Slide 2 di 4',
        },
        modules: bindEffect({
            toggleAttribute: {
                hidden: () => proxi.activenavItem !== 2,
            },
        }),
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
                            tag: 'h2',
                            attributes: { tabindex: '-1' },
                            className: 'title-biggest',
                            modules: setRef('section2_title'),
                            content: proxi.block_2.title,
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
                        content: proxi.block_2.copy,
                    },
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {ProxiSelfState<import('./type').About>} params.proxi
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const block03 = ({ setRef, proxi, bindEffect }) => {
    return htmlObject({
        className: 'section',
        attributes: {
            id: 'slide-3',
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': 'Slide 3 di 4',
        },
        modules: bindEffect({
            toggleAttribute: {
                hidden: () => proxi.activenavItem !== 3,
            },
        }),
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
                            tag: 'h2',
                            attributes: { tabindex: '-1' },
                            className: 'title-biggest',
                            modules: setRef('section3_title'),
                            content: proxi.block_3.title,
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
                        content: proxi.block_3.copy,
                    },
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {SetRef<import('./type').About>} params.setRef
 * @param {ProxiSelfState<import('./type').About>} params.proxi
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const block04 = ({ setRef, proxi, bindEffect }) => {
    return htmlObject({
        className: 'section section--last',
        attributes: {
            id: 'slide-4',
            role: 'group',
            'aria-roledescription': 'slide',
            'aria-label': 'Slide 4 di 4',
        },
        modules: bindEffect({
            toggleAttribute: {
                hidden: () => proxi.activenavItem !== 4,
            },
        }),
        content: [
            {
                className: 'section-top u-has-overflow',
                content: {
                    tag: 'h2',
                    attributes: { tabindex: '-1' },
                    className: 'title-biggest',
                    modules: setRef('section4_title'),
                    content: proxi.block_4.title,
                },
            },
            {
                className: 'section-bottom u-has-overflow',
                content: {
                    tag: 'ul',
                    className: 'section-list',
                    content: proxi.block_4.items.map((item) => {
                        return htmlObject({
                            tag: 'li',
                            className: 'section-list-item',
                            content: `[ ${item} ]`,
                        });
                    }),
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').About>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').About>} params.bindEffect
 */
const navigation = ({ proxi, delegateEvents, bindEffect }) => {
    return htmlObject({
        tag: 'nav',
        attributes: {
            role: 'tablist',
            'aria-label': 'Select a slide',
        },
        className: 'nav',
        content: proxi.navItem.map(({ index, label }) => {
            return htmlObject({
                tag: 'button',
                className: 'nav-button',
                attributes: {
                    type: 'button',
                    role: 'tab',
                    'aria-controls': `slide-${index}`,
                    'aria-label': `Go to slide ${index}: ${label}`,
                },
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
                        toggleAttribute: {
                            'aria-selected': () =>
                                proxi.activenavItem === index
                                    ? 'true'
                                    : 'false',
                            tabindex: () =>
                                proxi.activenavItem === index ? '-1' : '0',
                        },
                    }),
                ],
                content: label,
            });
        }),
    });
};

/**
 * @returns {HTMLElement}
 */
const getSquare = () => {
    return htmlObject({
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
    bindEffect,
    delegateEvents,
    getSelfProxi,
    watch,
}) => {
    const proxi = getSelfProxi();
    const numberOfSection = 4;

    let freezeOnLag = false;

    onMount(() => {
        /**
         * Which focus for each section ?
         */
        const focusMap = new Map([
            [1, getRef().title_1],
            [2, getRef().section2_title],
            [3, getRef().section3_title],
            [4, getRef().section4_title],
        ]);

        /**
         * Move focus inside slider.
         */
        watch(
            () => proxi.activenavItem,
            (value) => {
                const currentTile = focusMap.get(value);
                if (!currentTile) return;
                const focusVisible = value === 1;
                currentTile.focus({ preventScroll: true, focusVisible });
            }
        );

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
            focusMap.clear();
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

    return htmlObject({
        className: 'l-about',
        style: { '--number-of-section': `${numberOfSection}` },
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
                attributes: {
                    role: 'region',
                    'aria-roledescription': 'carousel',
                    'aria-label': 'informazioni sul progetto',
                },
                modules: setRef('screenElement'),
                content: {
                    className: 'scrollable-element',
                    modules: setRef('scrollerElement'),
                    content: {
                        className: 'scollable-container',
                        attributes: {
                            id: 'carousel-track',
                        },
                        modules: setRef('wrapElement'),
                        content: [
                            block01({ setRef, proxi, bindEffect }),
                            block02({ setRef, proxi, bindEffect }),
                            block03({ setRef, proxi, bindEffect }),
                            block04({ setRef, proxi, bindEffect }),
                        ],
                    },
                },
            },
            {
                tag: 'button',
                className: 'prev',
                attributes: {
                    type: 'button',
                    'aria-controls': 'carousel-track',
                    'aria-label': 'Previous slide',
                },
                modules: prevModules,
            },
            navigation({ bindEffect, delegateEvents, proxi }),
            {
                tag: 'button',
                className: 'next',
                attributes: {
                    type: 'button',
                    'aria-controls': 'carousel-track',
                    'aria-label': 'next slide',
                },
                modules: nextModules,
            },
        ],
    });
};
