//@ts-check

/**
 * @import {MobComponent, ReturnBindProps, StaticProps, DelegateEvents} from '@mobJsType';
 * @import {DynamicListCardInner} from './innerCard/type';
 * @import {DynamicListCard} from './type';
 * @import {DynamicCounter} from '../counter/type';
 * @import {DynamicListButton} from '../button/type';
 */

import { html, MobJs } from '@mobJs';
import { innerData } from '../data';

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...Array.from({ length: numberOfItem }).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {StaticProps<DynamicListCardInner>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {DynamicListCard['state']} params.proxi
 */
const getInvalidateRender = ({ staticProps, delegateEvents, proxi }) => {
    return html`
        ${createArray(proxi.counter)
            .map((item) => {
                return html`
                    <div class="validate-test-wrapper">
                        <dynamic-list-card-inner
                            ${staticProps({
                                key: `${item}`,
                            })}
                            ${delegateEvents({
                                click: () => {
                                    console.log(
                                        'invalidate inside reepater click'
                                    );
                                },
                            })}
                        >
                        </dynamic-list-card-inner>
                    </div>
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
}) => {
    const proxi = getProxi();
    let repeaterIndex = 0;

    onMount(async () => {
        (async () => {
            await MobJs.tick();
            proxi.isMounted = true;
        })();

        return () => {};
    });

    const isFullClass = proxi.isFull ? 'is-full' : '';

    return html`
        <div
            class="c-dynamic-card ${isFullClass}"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.isMounted,
                    'is-selected': () => proxi.isSelected,
                },
            })}
        >
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
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
                <div class="id">id: ${id}</div>
                <div class="parentId">list index: ${proxi.parentListId}</div>
                <div class="index">${bindText`index: ${'index'}`}</div>
                <div class="label">${bindText`label: ${'label'}`}</div>
                <div class="counter">${bindText`counter: ${'counter'}`}</div>
                <div class="key">key: ${key.length > 0 ? key : 'no-key'}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${staticProps({
                            parentListId: proxi.parentListId,
                        })}
                        ${bindProps(
                            /** @returns {ReturnBindProps<DynamicCounter>} */
                            () => ({
                                counter: proxi.counter,
                            })
                        )}
                    />
                </dynamic-list-empty>

                <!-- Inner repeater -->
                <div class="c-dynamic-card__repeater-container">
                    <p><strong>Inner repeater:</strong></p>
                    <dynamic-list-button
                        class="c-dynamic-card__button"
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

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
                            bind: 'innerData',
                            key: 'key',
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

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
                            bind: 'innerData',
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

                <!-- Invalidate -->
                <div class="c-dynamic-card__invalidate">
                    <p>
                        <strong
                            >Inner invalidate<br />
                            on counter mutation:</strong
                        >
                    </p>
                    <div class="c-dynamic-card__invalidate__wrap">
                        ${invalidate({
                            bind: 'counter',
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
