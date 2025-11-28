//@ts-check

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   StaticProps
 * } from "@mobJsType"
 * @import {HorizontalScrollerButton} from "./button/type"
 * @import {HorizontalScroller} from "./type"
 */

import { offset, outerHeight } from '@mobCoreUtils';
import { html } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { MobBodyScroll } from '@mobMotionPlugin';
import { horizontalScrollerAnimation } from './animation/animation';

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
 * @param {StaticProps<import('./section/type').HorizontalScrollerSection>} params.staticProps
 * @returns {string}
 */
const getColumns = ({ numOfCol, pinIsVisible, staticProps }) => {
    const pinClass = pinIsVisible ? '' : 'hidden';

    return [...Array.from({ length: numOfCol }).keys()]
        .map((_col, i) => {
            return html`
                <horizontal-scroller-section
                    ${staticProps(
                        /** @type {import('./section/type').HorizontalScrollerSection['props']} */ ({
                            id: i,
                            pinClass,
                        })
                    )}
                ></horizontal-scroller-section>
            `;
        })
        .join('');
};

/**
 * @param {object} param
 * @param {number} param.numOfCol
 * @param {ProxiState<HorizontalScroller>} param.proxi
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 */
const getNav = ({ numOfCol, proxi, staticProps, delegateEvents }) => {
    return [...Array.from({ length: numOfCol }).keys()]
        .map((_col, i) => {
            return html`
                <horizontal-scroller-button
                    ${staticProps(
                        /** @type {HorizontalScrollerButton['props']} */ ({
                            id: i,
                        })
                    )}
                    ${delegateEvents({
                        click: () => (proxi.currentId = i),
                    })}
                ></horizontal-scroller-button>
            `;
        })
        .join('');
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
        if (MobMotionCore.mq('max', 'desktop')) return;

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

    /**
     * Skip mobile.
     */
    if (MobMotionCore.mq('max', 'desktop'))
        return html`<div><only-desktop></only-desktop></div>`;

    /**
     * Desktop
     */
    return html`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ${setRef('js_nav')}>
            ${getNav({
                numOfCol: 10,
                proxi,
                staticProps,
                delegateEvents,
            })}
        </ul>
        <div class="l-h-scroller__root js-root" ${setRef('js_root')}>
            <div
                class="l-h-scroller__container js-container"
                ${setRef('js_container')}
            >
                <div class="l-h-scroller__row js-row" ${setRef('js_root')}>
                    ${getColumns({
                        numOfCol: 10,
                        pinIsVisible: !proxi.animatePin,
                        staticProps,
                    })}
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ${setRef('js_trigger')}
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`;
};
