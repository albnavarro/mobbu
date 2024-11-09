//@ts-check

/**
 * @import { MobComponent, SetState, BindProps, StaticProps, DelegateEvents } from '../../../mobjs/type';
 * @import { HorizontalScroller } from './type';
 * @import { HorizontalScrollerButton } from './horizontalScrollerButton/type';
 * @import { SetStateByName } from '../../../mobjs/type';
 * @import { QuickNav } from '../../common/nextPage/type';
 * @import { AnimationTitle } from '../../common/animationTitle/type';
 * @import { CodeButton } from '../../common/codeButton/type';]
 **/

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
 * @param {SetState<HorizontalScroller>} param.setState
 * @param {BindProps<HorizontalScroller, HorizontalScrollerButton>} param.bindProps
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
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

/** @type {MobComponent<HorizontalScroller>} */
export const HorizontalScrollerFn = ({
    onMount,
    html,
    getState,
    setState,
    watch,
    staticProps,
    bindProps,
    delegateEvents,
    setRef,
    getRef,
}) => {
    const { animatePin, prevRoute, nextRoute } = getState();

    onMount(({ element }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const indicators = element.querySelectorAll('.js-indicator');
        const nav = element.querySelector('.js-nav');
        const titles = element.querySelectorAll('.js-title h1');
        const { destroy } = horizontalScrollerAnimation({
            rootRef: getRef().js_root,
            indicators,
            titles,
            nav,
            ...getState(),
            setState,
        });

        /** @type {SetStateByName<QuickNav>} */
        const setQuickNavState = setStateByName('quick_nav');

        /** @type {SetStateByName<AnimationTitle>} */
        const setMainTitleState = setStateByName('animation_title');

        /** @type {SetStateByName<CodeButton>} */
        const setCodeButtonState = setStateByName('global-code-button');

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('prevRoute', prevRoute);
        setQuickNavState('nextRoute', nextRoute);
        setQuickNavState('color', 'white');

        /**
         * Title.
         */
        setMainTitleState('align', 'right');
        setMainTitleState('color', 'white');
        setMainTitleState(
            'title',
            animatePin
                ? 'HorizontalScroller: smooth pin'
                : 'HorizontalScroller: classic pin'
        );

        /**
         * Code button
         */
        const { horizontalScroller } = getLegendData();
        const { source } = horizontalScroller;
        setCodeButtonState('drawers', [
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
        setCodeButtonState('color', 'white');

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
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setQuickNavState('color', 'black');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
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
        <ul class="l-h-scroller__nav js-nav" ${setRef('js_nav')}>
            ${getNav({
                numOfCol: 10,
                setState,
                bindProps,
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
