//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { DelegateEvents, SetState, GetState, BindProps } from '../../../mobjs/type';
 * @import {ScrollTo} from './type'
 * @import {ScrollToButton} from './button/type'
 */

import { offset } from '../../../mobCore/utils';
import { html } from '../../../mobjs';
import { MobMotionCore } from '../../../mobMotion';
import { MobBodyScroll } from '../../../mobMotion/plugin';

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
    // const anchorItems = getState?.()?.anchorItems ?? [];
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
                                await MobBodyScroll.to(offsetTop);

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

/** @type {MobComponent<ScrollTo>} */
export const ScrollToFn = ({
    onMount,
    delegateEvents,
    bindProps,
    setState,
    getState,
    invalidate,
    computed,
    addMethod,
    updateState,
}) => {
    addMethod('addItem', ({ id, label, element }) => {
        updateState('anchorItemsToBeComputed', (val) => {
            return [...val, { id, label, element }];
        });
    });

    addMethod('setActiveLabel', (label) => {
        if (disableObservereffect) return;
        setState('activeLabel', label);
    });

    onMount(() => {
        if (MobMotionCore.mq('max', 'large')) return;

        /**
         * SpacerAnchor add label in different time during render.
         * Use computed to get last array of label completed.
         */
        computed(
            'anchorItems',
            ['anchorItemsToBeComputed'],
            ({ anchorItemsToBeComputed }) => anchorItemsToBeComputed
        );
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
                            setState,
                            getState,
                        });
                    },
                })}
            </ul>
        </div>
    `;
};
