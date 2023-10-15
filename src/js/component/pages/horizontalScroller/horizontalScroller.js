import { getLegendData } from '../../../data';
import { offset, outerHeight } from '../../../mobCore/utils';
import { html } from '../../../mobjs';
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

const getNav = ({ numOfCol, setState, bindProps, bindEvents, staticProps }) => {
    return [...new Array(numOfCol).keys()]
        .map((_col, i) => {
            return html`
                <horizontal-scroller-button
                    ${staticProps({
                        id: i,
                    })}
                    ${bindEvents({
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
    bindEvents,
}) => {
    const { animatePin } = getState();

    onMount(({ element }) => {
        const indicators = element.querySelectorAll('.js-indicator');
        const nav = element.querySelector('.js-nav');
        const titles = element.querySelectorAll('.js-title h1');
        const { destroy } = horizontalScrollerAnimation({
            indicators,
            titles,
            nav,
            ...getState(),
            setState,
        });

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
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return html`<div class="l-h-scroller">
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
                        label: 'component',
                        source: source.component,
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
        <ul class="l-h-scroller__nav js-nav">
            ${getNav({
                numOfCol: 10,
                setState,
                bindProps,
                staticProps,
                bindEvents,
            })}
        </ul>
        <div class="l-h-scroller__root js-root">
            <div class="l-h-scroller__container js-container">
                <div class="l-h-scroller__row js-row">
                    ${getColumns({
                        numOfCol: 10,
                        pinIsVisible: !animatePin,
                        staticProps,
                    })}
                </div>
                <div class="l-h-scroller__trigger js-trigger"></div>
            </div>
        </div>
        <div class="l-h-scroller__bottom">scroll up</div>
    </div>`;
};
