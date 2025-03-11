//@ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 * @import { StaticProps, DelegateEvents, GetState } from '../../../../mobjs/type';
 * @import { DynamicListCardInner } from './innerCard/type';
 * @import { DynamicListCard } from './type';
 * @import { DynamicCounter } from '../counter/type';
 **/

import { html, MobJs } from '../../../../mobjs';
import { innerData } from '../data';

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {StaticProps<DynamicListCardInner>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {GetState<DynamicListCard>} params.getState
 */
const getInvalidateRender = ({ staticProps, delegateEvents, getState }) => {
    const { counter } = getState();

    return html`
        ${createArray(counter)
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
    getState,
    html,
    onMount,
    key,
    staticProps,
    bindProps,
    id,
    setState,
    updateState,
    delegateEvents,
    invalidate,
    repeat,
    bindText,
    bindEffect,
}) => {
    const { isFull, parentListId } = getState();
    let repeaterIndex = 0;

    onMount(async () => {
        (async () => {
            await MobJs.tick();
            setState('isMounted', true);
        })();

        return () => {};
    });

    const isFullClass = isFull ? 'is-full' : '';

    return html`
        <div
            class="c-dynamic-card ${isFullClass}"
            ${bindEffect([
                {
                    bind: 'isSelected',
                    toggleClass: {
                        'is-selected': () => getState().isSelected,
                    },
                },
                {
                    bind: 'isMounted',
                    toggleClass: {
                        active: () => getState().isMounted,
                    },
                },
            ])}
        >
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
                    ${delegateEvents({
                        click: () => {
                            updateState('isSelected', (val) => !val);
                        },
                    })}
                    ${bindProps({
                        bind: ['isSelected'],
                        props: ({ isSelected }) => {
                            return {
                                active: isSelected,
                            };
                        },
                    })}
                >
                    Select
                </dynamic-list-button>
                <div class="id">id: ${id}</div>
                <div class="parentId">list index: ${parentListId}</div>
                <div class="index">${bindText`index: ${'index'}`}</div>
                <div class="label">${bindText`label: ${'label'}`}</div>
                <div class="counter">${bindText`counter: ${'counter'}`}</div>
                <div class="key">key: ${key.length > 0 ? key : 'no-key'}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${staticProps({
                            parentListId,
                        })}
                        ${bindProps({
                            bind: ['counter'],
                            /** @return {ReturnBindProps<DynamicCounter>} */
                            props: ({ counter }) => {
                                return { counter };
                            },
                        })}
                    />
                </dynamic-list-empty>

                <!-- Inner repeater -->
                <div class="c-dynamic-card__repeater-container">
                    <p><strong>Inner repeater:</strong></p>
                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${delegateEvents({
                            click: () => {
                                repeaterIndex =
                                    repeaterIndex < innerData.length - 1
                                        ? repeaterIndex + 1
                                        : 0;

                                setState('innerData', innerData[repeaterIndex]);
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
                            render: ({ html, current }) => {
                                return html`<dynamic-list-card-inner
                                    ${bindProps({
                                        /** @return {ReturnBindProps<DynamicListCardInner>} */
                                        props: () => {
                                            return {
                                                key: `${current.value.key}`,
                                            };
                                        },
                                    })}
                                ></dynamic-list-card-inner>`;
                            },
                        })}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
                            bind: 'innerData',
                            render: ({ html, current }) => {
                                return html`<dynamic-list-card-inner
                                    ${bindProps({
                                        /** @return {ReturnBindProps<DynamicListCardInner>} */
                                        props: () => {
                                            return {
                                                key: `${current.value.key}`,
                                            };
                                        },
                                    })}
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
                                    getState,
                                    delegateEvents,
                                    staticProps,
                                });
                            },
                        })}
                    </div>
                </div>
            </div>
        </div>
    `;
};
