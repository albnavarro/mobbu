//@ts-check

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   StaticProps
 * } from "@mobJsType"
 * @import {HorizontalScrollerButtonType} from "./button/type"
 * @import {HorizontalScroller} from "./type"
 */

import { offset, outerHeight } from '@mobCoreUtils';
import { fromObject } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';
import { horizontalScrollerAnimation } from './animation/animation';
import { HorizontalScrollerSection } from './section/definition';
import { HorizontalScrollerButton } from './button/definition';

/**
 * @param {number} id
 * @param {number} total
 * @returns {number}
 */
const getScrollAdjustment = (id, total) => {
    if (id === 0) return 1;
    if (id === total - 1) return -1;
    return 0;
};

/**
 * @param {object} params
 * @param {number} params.numOfCol
 * @param {boolean} params.pinIsVisible
 * @param {StaticProps<import('./section/type').HorizontalScrollerSectionType>} params.staticProps
 * @returns {string[]}
 */
const getColumns = ({ numOfCol, pinIsVisible, staticProps }) => {
    const pinClass = pinIsVisible ? '' : 'hidden';

    return [...Array.from({ length: numOfCol }).keys()].map((_col, i) => {
        return fromObject({
            component: HorizontalScrollerSection,
            modules: staticProps(
                /** @type {import('./section/type').HorizontalScrollerSectionType['props']} */ ({
                    id: i,
                    pinClass,
                })
            ),
        });
    });
};

/**
 * @param {object} param
 * @param {number} param.numOfCol
 * @param {ProxiState<HorizontalScroller>} param.proxi
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 */
const getNav = ({ numOfCol, proxi, staticProps, delegateEvents }) => {
    return [...Array.from({ length: numOfCol }).keys()].map((_col, i) => {
        return fromObject({
            component: HorizontalScrollerButton,
            modules: [
                staticProps(
                    /** @type {HorizontalScrollerButtonType['props']} */ ({
                        id: i,
                    })
                ),
                delegateEvents({
                    click: () => (proxi.currentId = i),
                }),
            ],
        });
    });
};

/** @type {MobComponent<HorizontalScroller>} */
export const HorizontalScrollerFn = ({
    onMount,
    watch,
    staticProps,
    delegateEvents,
    setRef,
    getRef,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const numberOfColumns = 10;
        const indicators = [...element.querySelectorAll('.js-indicator')];
        const nav = element.querySelector('.js-nav');
        const titles = [...element.querySelectorAll('.js-title h1')];
        const { destroy } = horizontalScrollerAnimation({
            rootRef: getRef().js_root,
            // @ts-ignore
            indicators,
            // @ts-ignore
            titles,
            // @ts-ignore
            nav,
            animatePin: proxi.animatePin,
            proxi,
        });

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        watch(
            () => proxi.currentId,
            (currentId, previousId) => {
                /**
                 * Get item shadow element.
                 */
                const shadowCenter = element.querySelector(
                    `.shadowClass--section-${currentId} .shadowClass--in-center`
                );

                /**
                 * Get scroll value.
                 */
                // @ts-ignore
                const { top } = offset(shadowCenter);
                // @ts-ignore
                const height = outerHeight(shadowCenter);
                const scrollValue =
                    /**
                     * Need previous and current value difference > 0 so add 1px. active: currentId ||
                     * currentIdFromScroll ( onLeaveBack issue )
                     */
                    // @ts-ignore
                    Number.parseInt(currentId) === 0
                        ? window.innerHeight + 1
                        : top + height - window.innerHeight;

                /**
                 * Get duration value related of distance. Minimum, distance is 1
                 */
                const distance = Math.max(1, Math.abs(currentId - previousId));
                const baseDuration = 2000;
                const multiplier = 0.9;
                const factor =
                    1 +
                    ((numberOfColumns - distance) / numberOfColumns) *
                        multiplier;
                const duration =
                    (distance / numberOfColumns) * baseDuration * factor;

                /**
                 * Scroll remove 1px to avoid navigation disappear ( secure margin )
                 */
                MobBodyScroll.to(
                    scrollValue +
                        getScrollAdjustment(currentId, numberOfColumns),
                    { duration }
                );
            }
        );

        return () => {
            destroy();
        };
    });

    return fromObject({
        className: 'l-h-scroller',
        content: [
            {
                className: 'top',
                content: 'scroll down',
            },
            {
                tag: 'ul',
                className: 'nav js-nav',
                modules: setRef('js_nav'),
                content: getNav({
                    numOfCol: 10,
                    proxi,
                    staticProps,
                    delegateEvents,
                }),
            },
            {
                className: 'js-row',
                modules: setRef('js_root'),
                content: {
                    className: 'wrapper js-container',
                    modules: setRef('js_container'),
                    content: [
                        {
                            className: 'js-row',
                            modules: setRef('js_root'),
                            content: getColumns({
                                numOfCol: 10,
                                pinIsVisible: !proxi.animatePin,
                                staticProps,
                            }),
                        },
                        {
                            className: 'js-trigger',
                            modules: setRef('js_trigger'),
                        },
                    ],
                },
            },
            {
                content: 'scroll up',
            },
        ],
    });
};
