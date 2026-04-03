//@ts-check

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListButton} from "../../button/type"
 * @import {DynamicCounter} from "./counter/type"
 * @import {DynamicListCardInner} from "./innerCard/type"
 * @import {DynamicListCard} from "./type"
 */

import { html, MobJs } from '@mobJs';
import { innerData } from '@pagesComponent/dynamic-list/data';

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...Array.from({ length: numberOfItem }).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {StaticProps<DynamicListCardInner>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<DynamicListCard>} params.proxi
 */
const getInvalidateRender = ({ staticProps, delegateEvents, proxi }) => {
    return html`
        <!-- component -->
        ${createArray(proxi.counter)
            .map((item) => {
                return html`
                    <dynamic-list-card-inner
                        ${staticProps(
                            /** @type {DynamicListCardInner['props']} */ ({
                                key: `${item}`,
                            })
                        )}
                        ${delegateEvents({
                            click: () => {
                                console.log('invalidate inside reepater click');
                            },
                        })}
                    >
                    </dynamic-list-card-inner>
                `;
            })
            .join('')}
    `;
};

/** @type {MobComponent<DynamicListCard>} */
export const DynamicListCardFn = ({
    onMount,
    key,
    staticProps,
    bindProps,
    id,
    delegateEvents,
    invalidate,
    repeat,
    bindText,
    bindEffect,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();
    let repeaterIndex = 0;

    computed(
        () => proxi.innerDataUnivoque,
        () =>
            proxi.innerData.filter(
                (value, index, self) =>
                    self.map(({ key }) => key).indexOf(value.key) === index
            )
    );

    onMount(async () => {
        (async () => {
            await MobJs.tick();

            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        })();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return html`
        <div
            class="c-dynamic-card"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.isMounted,
                    'is-selected': () => proxi.isSelected,
                },
            })}
        >
            <div class="card-container">
                <p class="card-title">card content</p>

                <!-- component -->
                <dynamic-list-button
                    class="repeater-card-button"
                    ${delegateEvents({
                        click: () => {
                            proxi.isSelected = !proxi.isSelected;
                        },
                    })}
                    ${bindProps(
                        /** @returns {ReturnBindProps<DynamicListButton>} */
                        () => ({
                            active: proxi.isSelected,
                        })
                    )}
                >
                    Select
                </dynamic-list-button>
                <div>id: ${id}</div>
                <div>list index: ${proxi.parentListId}</div>
                <div>${bindText`index: ${'index'}`}</div>
                <div>${bindText`label: ${'label'}`}</div>
                <div>${bindText`counter: ${'counter'}`}</div>
                <div>key: ${key.length > 0 ? key : 'no-key'}</div>

                <!-- component -->
                <mobjs-slot name="card-label-slot"></mobjs-slot>

                <!-- component -->
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${staticProps(
                            /** @type {DynamicCounter['props']} */ ({
                                parentListId: proxi.parentListId,
                            })
                        )}
                        ${bindProps(
                            /** @returns {ReturnBindProps<DynamicCounter>} */
                            () => ({
                                counter: proxi.counter,
                            })
                        )}
                    />
                </dynamic-list-empty>

                <div class="card-repeater-wrap">
                    <p><strong>Inner repeater:</strong></p>

                    <!-- component -->
                    <dynamic-list-button
                        class="repeater-card-button"
                        ${delegateEvents({
                            click: async () => {
                                repeaterIndex =
                                    repeaterIndex < innerData.length - 1
                                        ? repeaterIndex + 1
                                        : 0;

                                proxi.innerData = innerData[repeaterIndex];
                                await MobJs.tick();
                            },
                        })}
                    >
                        Update:
                    </dynamic-list-button>

                    <div class="card-repeater">
                        <!-- component -->
                        ${repeat({
                            observe: () => proxi.innerDataUnivoque,
                            key: 'key',
                            render: ({ current }) => {
                                return html` <dynamic-list-card-inner
                                    ${bindProps(
                                        /** @returns {ReturnBindProps<DynamicListCardInner>} */
                                        () => ({
                                            key: `${current.value.key}`,
                                        })
                                    )}
                                ></dynamic-list-card-inner>`;
                            },
                        })}
                    </div>

                    <!-- component -->
                    <div class="card-repeater">
                        ${repeat({
                            observe: () => proxi.innerData,
                            render: ({ current }) => {
                                return html`<dynamic-list-card-inner
                                    ${bindProps(
                                        /** @returns {ReturnBindProps<DynamicListCardInner>} */
                                        () => ({
                                            key: `${current.value.key}`,
                                        })
                                    )}
                                ></dynamic-list-card-inner>`;
                            },
                        })}
                    </div>
                </div>

                <div class="card-invalidate">
                    <p>
                        <strong
                            >Inner invalidate<br />
                            on counter mutation:</strong
                        >
                    </p>
                    <div>
                        ${invalidate({
                            observe: () => proxi.counter,
                            render: () => {
                                return getInvalidateRender({
                                    delegateEvents,
                                    staticProps,
                                    proxi,
                                });
                            },
                        })}
                    </div>
                </div>
            </div>
        </div>
    `;
};
