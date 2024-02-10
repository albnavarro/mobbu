import { getLegendData } from '../../../data';
import { offset, outerHeight } from '../../../mobCore/utils';
import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
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
 * @param {import('../../../mobjs/type').componentType}
 */
export const HorizontalScroller = ({
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

    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const indicators = element.querySelectorAll('.js-indicator');
        const nav = element.querySelector('.js-nav');
        const titles = element.querySelectorAll('.js-title h1');
        const { destroy } = horizontalScrollerAnimation({
            rootRef: refs.js_root,
            indicators,
            titles,
            nav,
            ...getState(),
            setState,
        });

        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', prevRoute);
        setStateById(quicknavId, 'nextRoute', nextRoute);

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
            const { top } = offset(shadowCenter);
            const height = outerHeight(shadowCenter);
            const scrollValue =
                /**
                 * Need previous and current value difference > 0 so add 1px.
                 *                              active: currentId || currentIdFromScroll
                 * ( onLeaveBack issue )
                 */
                Number.parseInt(id) === 0
                    ? window.innerHeight + 1
                    : top + height - window.innerHeight;

            /**
             * Scroll
             */
            bodyScroll.to(scrollValue, { duration: 2000 });
        });

        return () => {
            destroy();
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
        };
    });

    const { horizontalScroller } = getLegendData();
    const { source } = horizontalScroller;

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
        <code-button
            ${staticProps({
                drawers: [
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
                ],
                style: 'legend',
            })}
        >
        </code-button>
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
