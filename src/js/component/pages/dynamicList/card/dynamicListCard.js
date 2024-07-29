//@ts-check

import { mobCore } from '../../../../mobCore';
import { html } from '../../../../mobjs';
import { innerData } from '../data';

// function wait() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }

/**
 * @param {any} label
 * @param {any} val
 */
function updateContent(label, val) {
    return `${label}: ${val}`;
}

/**
 * @param {number} numberOfItem
 */
function createArray(numberOfItem) {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {import('../../../../mobjs/type').StaticProps<import('./innerCard/type').DynamicListCardInner>} params.staticProps
 * @param {import('../../../../mobjs/type').DelegateEvents} params.delegateEvents
 * @param {import('../../../../mobjs/type').GetState<import('./type').DynamicListCard>} params.getState
 */
const getInvalidateRender = ({
    staticProps,
    delegateEvents,
    getState,
    bindProps,
    repeat,
}) => {
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
                        <div class="c-dynamic-card__invalidate__wrap">
                            ${repeat({
                                watch: 'innerData',
                                render: ({ sync, html }) => {
                                    return html`<dynamic-list-card-inner
                                        ${bindProps({
                                            props: ({ innerData }, index) => {
                                                return {
                                                    key: `${innerData[index].key}`,
                                                };
                                            },
                                        })}
                                        ${sync}
                                    ></dynamic-list-card-inner>`;
                                },
                            })}
                        </div>
                    </div>
                `;
            })
            .join('')}
    `;
};

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').DynamicListCard>}
 */
export const DynamicListCardFn = ({
    getState,
    html,
    onMount,
    key,
    staticProps,
    bindProps,
    watch,
    id,
    setState,
    delegateEvents,
    invalidate,
    repeat,
}) => {
    const { isFull, parentListId, index, label, counter } = getState();
    let repeaterIndex = 0;
    let elementRef;

    onMount(({ element, ref }) => {
        const { indexEl, labelEl, counterEl } = ref;
        elementRef = element;

        watch('index', (val) => {
            indexEl.textContent = updateContent('index', val);
        });

        watch('label', (val) => {
            labelEl.textContent = updateContent('label', val);
        });

        watch('counter', (val) => {
            counterEl.textContent = updateContent('counter', val);
        });

        mobCore.useFrame(() => {
            element.classList.add('active');
        });

        return () => {};
    });

    const isFullClass = isFull ? 'is-full' : '';

    let testCounter = 0;

    return html`
        <div class="c-dynamic-card ${isFullClass}">
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <dynamic-list-button
                    class="c-dynamic-card__button"
                    ${delegateEvents({
                        click: () => {
                            if (!elementRef) return;
                            setState('isSelected', (val) => !val);
                            elementRef.classList.toggle('is-selected');
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
                <div class="index" ref="indexEl">
                    ${updateContent('index', index)}
                </div>
                <div class="label" ref="labelEl">
                    ${updateContent('label', label)}
                </div>
                <div class="counter" ref="counterEl">
                    ${updateContent('counter', counter)}
                </div>
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
                            /** @return {import('../counter/type').DynamicCounter|{}} */
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

                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${delegateEvents({
                            click: () => {
                                testCounter += 1;

                                setState('innerData2', (val) => [
                                    ...val,
                                    { key: testCounter },
                                ]);
                            },
                        })}
                    >
                        Update +:
                    </dynamic-list-button>

                    <dynamic-list-button
                        class="c-dynamic-card__button"
                        ${delegateEvents({
                            click: () => {
                                setState('innerData2', (val) =>
                                    val.length > 0 ? val.slice(0, -1) : val
                                );
                            },
                        })}
                    >
                        Update -:
                    </dynamic-list-button>

                    <!-- repeater by key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
                            watch: 'innerData',
                            key: 'key',
                            render: ({ sync, html }) => {
                                return html`<dynamic-list-card-inner
                                    ${bindProps({
                                        /** @return {Partial<import('./innerCard/type').DynamicListCardInner>} */
                                        props: ({ innerData }, index) => {
                                            return {
                                                key: `${innerData[index].key}`,
                                            };
                                        },
                                    })}
                                    ${sync}
                                ></dynamic-list-card-inner>`;
                            },
                        })}
                    </div>

                    <!-- repeater no key -->
                    <div class="c-dynamic-card__repeater">
                        ${repeat({
                            watch: 'innerData',
                            key: 'key',
                            render: ({ sync, html }) => {
                                return html`<dynamic-list-card-inner
                                    ${bindProps({
                                        /** @return {Partial<import('./innerCard/type').DynamicListCardInner>} */
                                        props: ({ innerData }, index) => {
                                            return {
                                                key: `${innerData[index].key}`,
                                            };
                                        },
                                    })}
                                    ${sync}
                                >
                                    <div class="pippo">
                                        ${repeat({
                                            watch: 'innerData2',
                                            render: ({ html, sync }) => {
                                                return html`<dynamic-list-card-inner
                                                    ${bindProps({
                                                        /** @return {Partial<import('./innerCard/type').DynamicListCardInner>} */
                                                        props: (
                                                            { innerData2 },
                                                            index
                                                        ) => {
                                                            console.log(
                                                                innerData2,
                                                                index,
                                                                innerData2[
                                                                    index
                                                                ].key
                                                            );

                                                            return {
                                                                key: `${innerData2[index].key}`,
                                                            };
                                                        },
                                                    })}
                                                    ${sync}
                                                >
                                                </dynamic-list-card-inner>`;
                                            },
                                        })}
                                    </div>
                                </dynamic-list-card-inner>`;
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
                            bind: ['counter'],
                            render: () => {
                                return getInvalidateRender({
                                    getState,
                                    delegateEvents,
                                    staticProps,
                                    repeat,
                                    bindProps,
                                });
                            },
                        })}
                    </div>
                </div>
            </div>
        </div>
    `;
};
