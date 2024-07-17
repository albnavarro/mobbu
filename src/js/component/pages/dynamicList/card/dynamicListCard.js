//@ts-check

import { mobCore } from '../../../../mobCore';
import { innerData } from '../data';

// function wait() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }

function updateContent(label, val) {
    return `${label}: ${val}`;
}

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
    repeat,
    setState,
    delegateEvents,
    invalidate,
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
                                                key: innerData[index].key,
                                            };
                                        },
                                    })}
                                    ${sync}
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
                            bind: ['counter'],
                            render: ({ sync, html }) => {
                                return html`<div class="validate-test-wrapper">
                                    <dynamic-list-card-inner
                                        ${bindProps({
                                            props: ({ counter }) => {
                                                return {
                                                    key: counter,
                                                };
                                            },
                                        })}
                                        ${sync}
                                    ></dynamic-list-card-inner>
                                </div>`;
                            },
                        })}
                    </div>
                </div>
            </div>
        </div>
    `;
};
