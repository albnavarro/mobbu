//@ts-check

/**
 * @import { MobComponent, ReturnBindProps, DelegateEvents, BindProps  } from '@mobJsType';
 * @import {ScrollTo} from './type'
 * @import {ScrollToButton} from './button/type'
 */

import { offset } from '@mobCoreUtils';
import { html } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { MobBodyScroll } from '@mobMotionPlugin';

let disableObservereffect = false;

/**
 * @param {Object} param
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<ScrollTo,ScrollToButton>} param.bindProps
 * @param {ScrollTo['state']} param.proxi
 * @returns {string}
 */
function getButtons({ delegateEvents, bindProps, proxi }) {
    return proxi.anchorItems
        .map((item) => {
            return html`
                <li>
                    <scroll-to-button
                        ${delegateEvents({
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

                                /**
                                 * back to enable spacerAnchor observer.
                                 */
                                disableObservereffect = false;
                            },
                        })}
                        ${bindProps(
                            /** @returns{ReturnBindProps<ScrollToButton>} */
                            () => ({
                                active: proxi.activeLabel === item.label,
                                label: item.label,
                            })
                        )}
                    >
                    </scroll-to-button>
                </li>
            `;
        })
        .join('');
}

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

    addMethod('addItem', ({ id, label, element }) => {
        updateState('anchorItemsToBeComputed', (val) => {
            return [...val, { id, label, element }];
        });
    });

    addMethod('setActiveLabel', (label) => {
        if (disableObservereffect) return;
        proxi.activeLabel = label;
    });

    onMount(() => {
        if (MobMotionCore.mq('max', 'large')) return;

        /**
         * SpacerAnchor add label in different time during render.
         * Use computed to get last array of label completed.
         */
        computed('anchorItems', () => proxi.anchorItemsToBeComputed);
    });

    return html`
        <div class="c-scroll-to">
            <ul>
                ${invalidate({
                    bind: 'anchorItems',
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
