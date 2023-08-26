import { getLegendData } from '../../../data';
import { bodyScroll } from '../../../mobbu/plugin';
import { offset, outerHeight } from '../../../mobbu/utils/vanillaFunction';
import { horizontalScrollerAnimation } from './animation/animation';

const getColumns = ({ numOfCol, pinIsVisible, staticProps }) => {
    const pinClass = pinIsVisible ? '' : 'hidden';

    return [...Array(numOfCol).keys()]
        .map((_col, i) => {
            return /* HTML */ `
                <HorizontalScrollerSection
                    ${staticProps({
                        id: i,
                        pinClass,
                    })}
                ></HorizontalScrollerSection>
            `;
        })
        .join('');
};

const getNav = ({ numOfCol, setState, bindProps, staticProps }) => {
    return [...Array(numOfCol).keys()]
        .map((_col, i) => {
            return /* HTML */ `
                <HorizontalScrollerButton
                    ${staticProps({
                        id: i,
                        callback: () => setState('currentId', i),
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
                ></HorizontalScrollerButton>
            `;
        })
        .join('');
};

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const HorizontalScroller = ({
    onMount,
    render,
    getState,
    setState,
    watch,
    staticProps,
    bindProps,
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
                 * Need previous and current value diffrence > 0 so add 1px.
                 *                              active: currentId || currentIdFromScroll
                 * ( onLeaveBack issue )
                 */
                parseInt(id) === 0
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

    return render(/* HTML */ `<div class="l-h-scroller">
        <div class="l-h-scroller__top">scroll down</div>
        <CodeButton
            ${staticProps({
                drawers: [
                    {
                        label: 'description',
                        source: source.description,
                    },
                    {
                        label: 'animation',
                        source: source.js,
                    },
                    {
                        label: 'component',
                        source: source.component,
                    },
                ],
                style: 'legend',
            })}
        >
        </CodeButton>
        <ul class="l-h-scroller__nav js-nav">
            ${getNav({ numOfCol: 10, setState, bindProps, staticProps })}
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
    </div>`);
};
