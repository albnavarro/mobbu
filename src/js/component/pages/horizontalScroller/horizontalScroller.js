//@ts-check

import { getLegendData } from '../../../data';
import { offset, outerHeight } from '../../../mobCore/utils';
import { html, setStateByName } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { horizontalScrollerAnimation } from './animation/animation';

const getColumns = ({ numOfCol, pinIsVisible, staticProps }) => {
    const pinClass = pinIsVisible ? '' : 'hidden';

    return [...new Array(numOfCol).keys()]
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
 * @param {import('../../../mobjs/type').SetState<import('./type').HorizontalScroller>} param.setState
 * @param {import('../../../mobjs/type').BindProps<import('./type').HorizontalScroller, import('./horizontalScrollerButton/type').HorizontalScrollerButton>} param.bindProps
 * @param {import('../../../mobjs/type').StaticProps} param.staticProps
 * @param {import('../../../mobjs/type').DelegateEvents} param.delegateEvents
 */
const getNav = ({
    numOfCol,
    setState,
    bindProps,
    staticProps,
    delegateEvents,
}) => {
    return [...new Array(numOfCol).keys()]
        .map((_col, i) => {
            return html`
                <horizontal-scroller-button
                    ${staticProps({
                        id: i,
                    })}
                    ${delegateEvents({
                        click: () => setState('currentId', i),
                    })}
                    ${bindProps({
                        bind: ['currentId', 'currentIdFromScroll'],
                        props: ({ currentId, currentIdFromScroll }) => {
                            return {
                                active:
                                    currentId === i ||
                                    currentIdFromScroll === i,
                            };
                        },
                    })}
                ></horizontal-scroller-button>
            `;
        })
        .join('');
};

/**
 * @type {import('../../../mobjs/type').mobComponent<import('./type').HorizontalScroller>}
 */
export const HorizontalScrollerFn = ({
    onMount,
    html,
    getState,
    setState,
    watch,
    staticProps,
    bindProps,
    delegateEvents,
}) => {
    const { animatePin, svgLeft, svgRight, prevRoute, nextRoute } = getState();

    onMount(({ element, ref }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const indicators = element.querySelectorAll('.js-indicator');
        const nav = element.querySelector('.js-nav');
        const titles = element.querySelectorAll('.js-title h1');
        const { destroy } = horizontalScrollerAnimation({
            rootRef: ref['js_root'],
            indicators,
            titles,
            nav,
            ...getState(),
            setState,
        });

        /**
         * Quicknav
         */
        setStateByName('quick_nav', 'active', true);
        setStateByName('quick_nav', 'prevRoute', prevRoute);
        setStateByName('quick_nav', 'nextRoute', nextRoute);
        setStateByName('quick_nav', 'color', 'white');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'right');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'HorizontalScroller');

        /**
         * Code button
         */
        const { horizontalScroller } = getLegendData();
        const { source } = horizontalScroller;
        setStateByName('global-code-button', 'drawers', [
            {
                label: 'description',
                source: source.description,
            },
            {
                label: 'definition',
                source: source.definition,
            },
            {
                label: 'scroller',
                source: source.scroller,
            },
            {
                label: 'section',
                source: source.section,
            },
            {
                label: 'buttons',
                source: source.buttons,
            },
            {
                label: 'animation',
                source: source.animation,
            },
        ]);
        setStateByName('global-code-button', 'color', 'white');

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        watch('currentId', (id) => {
            if (id === -1) return;

            /**
             * Hre the nav is open so on route landing the offset is wrong
             * So, refresh scroller and the scroll to item.
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
                 * Need previous and current value difference > 0 so add 1px.
                 *                              active: currentId || currentIdFromScroll
                 * ( onLeaveBack issue )
                 */
                // @ts-ignore
                Number.parseInt(id) === 0
                    ? window.innerHeight + 1
                    : top + height - window.innerHeight;

            /**
             * Scroll
             */
            // @ts-ignore
            bodyScroll.to(scrollValue, { duration: 2000 });
        });

        return () => {
            destroy();
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
            setStateByName('quick_nav', 'color', 'black');
            setStateByName('global-code-button', 'drawers', []);
        };
    });

    /**
     * Skip mobile.
     */
    if (motionCore.mq('max', 'desktop'))
        return html`<div><only-desktop></only-desktop></div>`;

    /**
     * Desktop
     */
    return html`<div class="l-h-scroller">
        <only-desktop></only-desktop>
        <div class="l-h-scroller__top">scroll down</div>
        <ul class="l-h-scroller__nav js-nav" ref="js_nav">
            ${getNav({
                numOfCol: 10,
                setState,
                bindProps,
                staticProps,
                delegateEvents,
            })}
        </ul>
        <div class="l-h-scroller__root js-root" ref="js_root">
            <div
                class="l-h-scroller__container js-container"
                ref="js_container"
            >
                <div class="l-h-scroller__row js-row" ref="js_row">
                    ${getColumns({
                        numOfCol: 10,
                        pinIsVisible: !animatePin,
                        staticProps,
                    })}
                    <section
                        class="l-h-scroller__fakeColumn js-column"
                        ref="js_column"
                    ></section>
                </div>
                <div
                    class="l-h-scroller__trigger js-trigger"
                    ref="js_trigger"
                ></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>

        <footer-shape-v1
            ${staticProps({ position: 'left', svg: svgLeft })}
        ></footer-shape-v1>
        <footer-shape-v1
            ${staticProps({ position: 'right', svg: svgRight })}
        ></footer-shape-v1>
    </div>`;
};
