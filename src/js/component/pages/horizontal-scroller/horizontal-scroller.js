//@ts-check

/**
 * @import {MobComponent, SetState, BindProps, StaticProps, DelegateEvents, ReturnBindProps} from '@mobJsType';
 * @import {HorizontalScroller} from './type';
 * @import {HorizontalScrollerButton} from './button/type';
 */

import { offset, outerHeight } from '@mobCoreUtils';
import { html } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { MobBodyScroll } from '@mobMotionPlugin';
import { horizontalScrollerAnimation } from './animation/animation';

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
                    ${staticProps({
                        id: i,
                        pinClass,
                    })}
                ></horizontal-scroller-section>
            `;
        })
        .join('');
};

/**
 * @param {object} param
 * @param {number} param.numOfCol
 * @param {SetState<HorizontalScroller>} param.setState
 * @param {BindProps<HorizontalScroller, HorizontalScrollerButton>} param.bindProps
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {HorizontalScroller['state']} param.proxi
 */
const getNav = ({
    numOfCol,
    setState,
    bindProps,
    staticProps,
    delegateEvents,
    proxi,
}) => {
    return [...Array.from({ length: numOfCol }).keys()]
        .map((_col, i) => {
            return html`
                <horizontal-scroller-button
                    ${staticProps({
                        id: i,
                    })}
                    ${delegateEvents({
                        click: () => setState('currentId', i),
                    })}
                    ${bindProps(
                        /** @returns {ReturnBindProps<HorizontalScrollerButton>} */
                        () => ({
                            active:
                                proxi.currentId === i ||
                                proxi.currentIdFromScroll === i,
                        })
                    )}
                ></horizontal-scroller-button>
            `;
        })
        .join('');
};

/** @type {MobComponent<HorizontalScroller>} */
export const HorizontalScrollerFn = ({
    onMount,
    getState,
    setState,
    watch,
    staticProps,
    bindProps,
    delegateEvents,
    setRef,
    getRef,
    getProxi,
}) => {
    const { animatePin } = getState();
    const proxi = getProxi();

    onMount(({ element }) => {
        if (MobMotionCore.mq('max', 'desktop')) return;

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
            ...getState(),
            setState,
        });

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        watch(
            () => proxi.currentId,
            (id) => {
                if (id === -1) return;

                /**
                 * Hre the nav is open so on route landing the offset is wrong So, refresh scroller and the scroll to
                 * item.
                 */

                /**
                 * Get item shadow element.
                 */
                const shadowCenter = element.querySelector(
                    `.shadowClass--section-${id} .shadowClass--in-center`
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
                    Number.parseInt(id) === 0
                        ? window.innerHeight + 1
                        : top + height - window.innerHeight;

                /**
                 * Scroll
                 */
                MobBodyScroll.to(scrollValue, { duration: 2000 });
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
                setState,
                bindProps,
                staticProps,
                delegateEvents,
                proxi,
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
                        pinIsVisible: !animatePin,
                        staticProps,
                    })}
                    <section
                        class="l-h-scroller__fakeColumn js-column"
                        ${setRef('js_column')}
                    ></section>
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
