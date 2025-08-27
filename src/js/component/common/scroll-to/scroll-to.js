/**
 * @import {MobComponent, ReturnBindProps, DelegateEvents, BindProps} from '@mobJsType';
 * @import {ScrollTo} from './type'
 * @import {ScrollToButton} from './button/type'
 */

import { MobCore } from '@mobCore';
import { offset } from '@mobCoreUtils';
import { html, MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { MobBodyScroll } from '@mobMotionPlugin';
import { debounceFuncion } from 'src/js/mob/mob-core/events/debounce';

let disableObservereffect = false;

/**
 * @param {Object} param
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<ScrollTo, ScrollToButton>} param.bindProps
 * @param {ScrollTo['state']} param.proxi
 * @returns {string}
 */
function getButtons({ delegateEvents, bindProps, proxi }) {
    return proxi.anchorItems
        .map((item) => {
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
                                      : offset(element).top - 50;

                              /**
                               * Disable spacerAnchor observer effect during scroll.
                               */
                              disableObservereffect = true;
                              proxi.activeLabel = label;
                              await MobBodyScroll.to(offsetTop);

                              setTimeout(() => {
                                  /**
                                   * Back to enable spacerAnchor observer. Wait one second to not colline with scroll
                                   * end.
                                   */
                                  disableObservereffect = false;
                              }, 1000);
                          },
                      });

            return html`
                <li>
                    <scroll-to-button
                        ${delegateEventsFn}
                        ${bindProps(
                            /** @returns {ReturnBindProps<ScrollToButton>} */
                            () => ({
                                active: proxi.activeLabel === item.label,
                                label: item.label,
                                isSection: item.isSection ?? false,
                                isNote: item.isNote ?? false,
                            })
                        )}
                    >
                    </scroll-to-button>
                </li>
            `;
        })
        .join('');
}

/**
 * @param {object} params
 * @param {ScrollTo['state']} params.proxi
 * @param {'DOWN' | 'UP'} params.direction
 * @returns {void}
 */
const setActiveLabelOnScroll = ({ proxi, direction }) => {
    const winHeight = window.innerHeight;

    if (direction === 'DOWN') {
        const activeItem = proxi.anchorItems.findLast(({ top, isNote }) => {
            return !isNote && top < window.scrollY + winHeight - 200;
        });

        proxi.activeLabel = activeItem ? activeItem.label : '';
    }

    if (direction === 'UP') {
        const activeItem = proxi.anchorItems.findLast(
            ({ top, isNote }) => !isNote && top < window.scrollY + 200
        );

        proxi.activeLabel = activeItem ? activeItem.label : '';
    }
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
    getProxi,
}) => {
    const proxi = getProxi();

    /**
     * @type {'DOWN' | 'UP'}
     */
    let direction = 'DOWN';

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
        if (MobMotionCore.mq('max', 'desktop')) return;

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
            debounceFuncion(() => {
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
        const unsubscribeMouseWheel = MobCore.useMouseWheel(
            debounceFuncion(() => {
                if (disableObservereffect) return;

                setActiveLabelOnScroll({ proxi, direction });
            }, 300)
        );

        /**
         * Check active label in scroll end.
         */
        const unsubScribeScrollEnd = MobCore.useScrollEnd(() => {
            if (disableObservereffect) return;

            setActiveLabelOnScroll({ proxi, direction });
        });

        return () => {
            unsubscribeMouseWheel();
            unsubscribeThrottle();
            unsubScribeScrollEnd();
            resizeObserver.unobserve(MobJs.getRoot());
            resizeObserver.disconnect();
            // @ts-ignore
            resizeObserver = null;
        };
    });

    return html`
        <div class="c-scroll-to">
            <ul>
                ${invalidate({
                    observe: () => proxi.anchorItems,
                    render: () => {
                        return getButtons({
                            delegateEvents,
                            bindProps,
                            proxi,
                        });
                    },
                })}
            </ul>
        </div>
    `;
};
