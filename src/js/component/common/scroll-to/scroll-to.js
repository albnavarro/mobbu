import { MobCore } from '@mobCore';
import { offset } from '@mobCoreUtils';
import { htmlObject, MobJs } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';
import { ScrollToButton } from './button/definition';
import { MobMotionCore } from '@mobMotion';
import { closeSidebarleft } from '@commonComponent/doc-container/utils';
import { verticalScroller } from '@componentLibs/animation/vertical-scroller';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps
 * } from '@mobJsType'
 * @import {ScrollToButtonType} from './button/type'
 * @import {ScrollTo} from './type'
 */

let disableObservereffect = false;

/**
 * @param {Object} param
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<ScrollTo, ScrollToButtonType>} param.bindProps
 * @param {ProxiSelfState<ScrollTo>} param.proxi
 * @returns {HTMLElement[]}
 */
function getButtons({ delegateEvents, bindProps, proxi }) {
    return proxi.anchorItems.map((item) => {
        /**
         * Skip click if is section title
         */
        const delegateEventsFn =
            item.isSection || item.isNote
                ? ''
                : delegateEvents({
                      click: async () => {
                          const { id: scroll, label, element } = item;

                          const offsetTop =
                              scroll === 'start'
                                  ? 0
                                  : offset(element).top - 100;

                          /**
                           * Disable spacerAnchor observer effect during scroll.
                           */
                          disableObservereffect = true;
                          proxi.activeLabel = label;
                          await MobBodyScroll.to(offsetTop, { duration: 10 });

                          if (MobMotionCore.mq('max', 'desktop')) {
                              closeSidebarleft();
                          }

                          /**
                           * Set focus to anchor element
                           */
                          /** @type {HTMLElement} */ (element).focus({
                              preventScroll: true,
                          });

                          setTimeout(() => {
                              /**
                               * Back to enable spacerAnchor observer. Wait one second to not colline with scroll end.
                               */
                              disableObservereffect = false;
                          }, 1000);
                      },
                  });

        return htmlObject({
            tag: 'li',
            content: {
                component: ScrollToButton,
                modules: [
                    delegateEventsFn,
                    bindProps(
                        /** @returns {ReturnBindProps<ScrollToButtonType>} */
                        () => ({
                            active: proxi.activeLabel === item.label,
                            label: item.label,
                            isSection: item.isSection ?? false,
                            isNote: item.isNote ?? false,
                        })
                    ),
                ],
            },
        });
    });
}

/**
 * @param {object} params
 * @param {ScrollTo['state']} params.proxi
 * @param {'DOWN' | 'UP'} params.direction
 * @param {number} params.winHeight
 * @returns {void}
 */
const setActiveLabelOnScroll = ({ proxi, direction, winHeight }) => {
    MobCore.useFrame(() => {
        MobCore.useNextTick(() => {
            if (!('anchorItems' in proxi)) return;

            if (direction === 'DOWN') {
                const activeItem = proxi.anchorItems.findLast(
                    ({ top, isNote }) => {
                        return (
                            !isNote && top < window.scrollY + winHeight - 200
                        );
                    }
                );

                proxi.activeLabel = activeItem ? activeItem.label : '';
            }

            if (direction === 'UP') {
                const activeItem = proxi.anchorItems.findLast(
                    ({ top, isNote }) => !isNote && top < window.scrollY + 200
                );

                proxi.activeLabel = activeItem ? activeItem.label : '';
            }
        });
    });
};

/** @type{() => void} */
let destroy = () => {};

/**
 * @param {object} params
 * @param {GetRef<import('./type').ScrollTo>} params.getRef
 */
const initScroller = ({ getRef }) => {
    const { screen, scroller, scrollbar } = getRef();
    const screenHeight = screen.offsetHeight;
    const scrollerHeight = scroller.offsetHeight;

    if (screenHeight >= scrollerHeight) {
        getRef().scrollbar.classList.add('hide-scrollbar');

        return {
            destroy: () => {},
            move: () => {},
            refresh: () => {},
            updateScroller: () => {},
        };
    }

    function inputHandler() {
        move(Number(scrollbar.value));
    }

    getRef().scrollbar.classList.remove('hide-scrollbar');
    scrollbar.addEventListener('input', inputHandler);

    const methods = verticalScroller({
        screen,
        scroller,
        scrollbar,
        fixedTab: false,
    });

    const init = methods.init;
    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;
    init();
    updateScroller();
    move(0);

    return {
        destroy: () => {
            scrollbar.removeEventListener('input', inputHandler);
            destroy();
        },
        move,
        refresh,
        updateScroller,
    };
};

/** @type {MobComponent<ScrollTo>} */
export const ScrollToFn = ({
    onMount,
    delegateEvents,
    bindProps,
    invalidate,
    computed,
    addMethod,
    updateState,
    getSelfProxi,
    getBoundedProxi,
    bindEffect,
    setRef,
    getRef,
}) => {
    const proxi = getSelfProxi();
    const bindProxi = getBoundedProxi();

    /**
     * @type {'DOWN' | 'UP'}
     */
    let direction = 'DOWN';
    let winHeight = window.innerHeight;

    addMethod('addItem', ({ id, label, element, isSection, isNote }) => {
        updateState('anchorItemsToBeComputed', (val) => {
            return [...val, { id, label, element, isSection, isNote }];
        });
    });

    addMethod('setActiveLabel', (label) => {
        if (disableObservereffect) return;
        proxi.activeLabel = label;
    });

    onMount(() => {
        /**
         * SpacerAnchor add label in different time during render. Use computed to get last array of label completed.
         *
         * Store offset.top value
         */
        computed(
            () => proxi.anchorItems,
            () => {
                return proxi.anchorItemsToBeComputed.map((item) => {
                    return {
                        ...item,
                        top: offset(item.element).top,
                    };
                });
            }
        );

        /**
         * Get scroll direction.
         */
        const unsubscribeThrottle = MobCore.useScrollThrottle(
            ({ direction: currentDirection }) => (direction = currentDirection)
        );

        /**
         * Update cached top value of each item on window resize with debiunce.
         */
        let resizeObserver = new ResizeObserver(
            MobCore.debounce(() => {
                MobCore.useFrame(() => {
                    MobCore.useNextTick(() => {
                        winHeight = window.innerHeight;
                    });
                });

                /**
                 * Here proxi can be destroyed;
                 */
                if (!('anchorItems' in proxi)) return;

                proxi.anchorItems.forEach((item) => {
                    item.top = offset(item.element).top;
                });
            }, 200)
        );

        resizeObserver.observe(MobJs.getRoot());

        /**
         * First check is performed by spacer-anchor using 'setActiveLabel' method.
         *
         * Check active label with less computed as possible, Find first valid occupprence starting from last
         */
        const unsubscribeMouseWheel = proxi.updateAnchorOnWheel
            ? MobCore.useMouseWheel(
                  MobCore.debounce(() => {
                      if (disableObservereffect) return;

                      setActiveLabelOnScroll({ proxi, direction, winHeight });
                  }, 600)
              )
            : () => {};

        /**
         * Check active label in scroll end.
         */
        const unsubScribeScrollEnd = MobCore.useScrollEnd(() => {
            if (disableObservereffect) return;

            setActiveLabelOnScroll({ proxi, direction, winHeight });
        });

        const unsubScribeResize = MobCore.useResize(() => {
            destroy();
            if (proxi.anchorItems.length === 0) return;

            MobCore.useFrameIndex(() => {
                ({ destroy } = initScroller({
                    getRef,
                }));
            }, 2);
        });

        return () => {
            unsubscribeMouseWheel();
            unsubscribeThrottle();
            unsubScribeScrollEnd();
            unsubScribeResize();
            resizeObserver.unobserve(MobJs.getRoot());
            resizeObserver.disconnect();
            // @ts-ignore
            resizeObserver = null;
            destroy();
            destroy = () => {};
        };
    });

    return htmlObject({
        className: 'c-scroll-to',
        content: [
            {
                className: 'title',
                content: 'In this page:',
            },
            {
                tag: 'input',
                className: 'scrollbar hide-scrollbar',
                attributes: {
                    type: 'range',
                    id: 'test',
                    name: 'test',
                    min: 0,
                    max: 100,
                    value: 0,
                    step: 0.5,
                    tabindex: '-1',
                },
                modules: setRef('scrollbar'),
            },
            {
                tag: 'nav',
                className: 'screen',
                attributes: {
                    'aria-label': 'page anchor',
                },
                modules: [
                    setRef('screen'),
                    bindEffect({
                        toggleAttribute: {
                            hidden: () => proxi.anchorItems.length === 0,
                            inert: () =>
                                bindProxi.shouldApplyInert ? true : null,
                        },
                    }),
                ],
                content: [
                    {
                        tag: 'ul',
                        modules: setRef('scroller'),
                        content: invalidate({
                            observe: () => proxi.anchorItems,
                            beforeUpdate: async () => {
                                destroy();
                            },
                            afterUpdate: () => {
                                if (proxi.anchorItems.length === 0) return;

                                MobCore.useFrameIndex(() => {
                                    ({ destroy } = initScroller({
                                        getRef,
                                    }));
                                }, 2);
                            },
                            render: () => {
                                return getButtons({
                                    delegateEvents,
                                    bindProps,
                                    proxi,
                                });
                            },
                        }),
                    },
                ],
            },
        ],
    });
};
