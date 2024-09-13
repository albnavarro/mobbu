//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { DelegateEvents, SetState, GetState, BindProps } from '../../../mobjs/type';
 * @import {ScrollTo} from './type'
 * @import {ScrollToButton} from './button/type'
 */

import { offset } from '../../../mobCore/utils';
import { html, tick } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { bodyScroll } from '../../../mobMotion/plugin';
import { anchorStore } from './scrollToStore';

let disableObservereffect = false;

/**
 * @param {Object} param
 * @param {DelegateEvents} param.delegateEvents
 * @param {SetState<ScrollTo>} param.setState
 * @param {GetState<ScrollTo>} param.getState
 * @param {BindProps<ScrollTo,ScrollToButton>} param.bindProps
 * @returns {string}
 */
function getButtons({ delegateEvents, setState, bindProps, getState }) {
    const { anchorItems } = getState();

    return anchorItems
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
                                setState('activeLabel', label);
                                await bodyScroll.to(offsetTop);

                                /**
                                 * back to enable spacerAnchor observer.
                                 */
                                disableObservereffect = false;
                            },
                        })}
                        ${bindProps({
                            bind: ['activeLabel'],
                            props: ({ activeLabel }) => {
                                const { label } = item;

                                return {
                                    active: activeLabel === label,
                                    label,
                                };
                            },
                        })}
                    >
                    </scroll-to-button>
                </li>
            `;
        })
        .join('');
}

/**
 * @type {MobComponent<ScrollTo>}
 */
export const ScrollToFn = ({
    html,
    onMount,
    delegateEvents,
    bindProps,
    setState,
    getState,
    invalidate,
}) => {
    onMount(() => {
        if (motionCore.mq('max', 'large')) return;

        const unWatchStoreComputed = anchorStore.watch(
            'computedItems',
            async (val) => {
                setState('anchorItems', val.reverse());
                await tick();

                console.log('resolve sctollto tick');
            }
        );

        const unWatchStoreActive = anchorStore.watch(
            'activeLabelFromObeserver',
            (label) => {
                if (disableObservereffect) return;

                setState('activeLabel', label);
            }
        );

        return () => {
            unWatchStoreComputed();
            unWatchStoreActive();
        };
    });

    return html`
        <div class="c-scroll-to">
            <ul ref="list">
                ${invalidate({
                    bind: 'anchorItems',
                    render: () => {
                        return getButtons({
                            delegateEvents,
                            bindProps,
                            setState,
                            getState,
                        });
                    },
                })}
            </ul>
        </div>
    `;
};
