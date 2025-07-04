//@ts-check

/**
 * @import {MobComponent, DelegateEvents, UpdateState, BindProps, StaticProps, UpdateStateByName, GetState, Invalidate, ReturnBindProps} from '@mobJsType'
 * @import {Matrioska} from './type'
 * @import {MatrioskaItem} from './item/type'
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';

const buttons = [
    {
        state: 'level1',
        maxItem: 5,
        ref: 'level1_counter',
        label_plus: 'level1 +',
        label_minus: 'level1 -',
    },
    {
        state: 'level2',
        maxItem: 5,
        ref: 'level2_counter',
        label_plus: 'level2 +',
        label_minus: 'level2 -',
    },
    {
        state: 'level3',
        maxItem: 6,
        ref: 'level3_counter',
        label_plus: 'level3 +',
        label_minus: 'level3 -',
    },
];

/** @param {number} max */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {UpdateState<Matrioska>} params.updateState
 * @param {Invalidate<Matrioska>} params.invalidate
 * @param {GetState<Matrioska>} params.getState
 */
const getButtons = ({ delegateEvents, updateState, invalidate, getState }) => {
    return html`
        ${buttons
            .map((button) => {
                return html` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                updateState(
                                    /** @type {'level1' | 'level2' | 'level3'} */ (
                                        button.state
                                    ),
                                    (val) => {
                                        return val.slice(0, -1);
                                    }
                                );
                            },
                        })}
                        >${button.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                updateState(
                                    /** @type {'level1' | 'level2' | 'level3'} */ (
                                        button.state
                                    ),
                                    (val) => {
                                        return [
                                            ...val,
                                            {
                                                key: getRandomInt(1000),
                                                value: MobCore.getUnivoqueId(),
                                            },
                                        ];
                                    }
                                );
                            },
                        })}
                        >${button.label_plus}</dynamic-list-button
                    >
                    <div class="matrioska__head__counter">
                        ${invalidate({
                            bind: /** @type {'level1' | 'level2' | 'level3'} */ (
                                button.state
                            ),
                            render: () => {
                                // @ts-ignore
                                const data = getState()?.[button.state];

                                return html`
                                    Number of items: ${data.length} ( max
                                    ${button.maxItem} )
                                `;
                            },
                        })}
                    </div>
                </div>`;
            })
            .join('')}
        <div class="matrioska__head__cta-counter">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        updateState('counter', (val) => val + 1);
                    },
                })}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;
};

/**
 * @param {object} params
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {GetState<Matrioska>} params.getState,
 * @param {Invalidate<Matrioska>} params.invalidate
 */
const getSecondLevel = ({
    staticProps,
    bindProps,
    delegateEvents,
    invalidate,
    getState,
}) => {
    return html`
        <div class="matrioska__level matrioska__level--2">
            ${invalidate({
                bind: 'level2',
                render: () => {
                    const { level2 } = getState();

                    return level2
                        .map((item) => {
                            return html`
                                <div
                                    class="matrioska__item-wrap matrioska__item-wrap--2"
                                >
                                    <matrioska-item
                                        class="matrioska-item--2"
                                        ${staticProps(
                                            /** @type {MatrioskaItem['state']} */ ({
                                                level: 'level 2',
                                            })
                                        )}
                                        ${bindProps({
                                            bind: ['counter'],
                                            props: ({ counter }) => {
                                                return {
                                                    key: `${item.key}`,
                                                    value: `${item.value}`,
                                                    counter,
                                                };
                                            },
                                        })}
                                    >
                                        ${getThirdLevel({
                                            staticProps,
                                            delegateEvents,
                                            getState,
                                            invalidate,
                                            bindProps,
                                        })}
                                    </matrioska-item>
                                </div>
                            `;
                        })
                        .join('');
                },
            })}
        </div>
    `;
};

/**
 * @param {object} params
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {Invalidate<Matrioska>} params.invalidate
 * @param {GetState<Matrioska>} params.getState
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 */
const getThirdLevel = ({
    staticProps,
    delegateEvents,
    invalidate,
    getState,
    bindProps,
}) => {
    return html` <div class="matrioska__level matrioska__level--3">
        ${invalidate({
            bind: 'level3',
            render: () => {
                const { level3 } = getState();

                return level3
                    .map((item) => {
                        const name = MobCore.getUnivoqueId();
                        const name2 = MobCore.getUnivoqueId();

                        return html`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--3"
                            >
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${name}"
                                    ${staticProps(
                                        /** @type {MatrioskaItem['state']} */ ({
                                            level: 'level 3',
                                            value: item.value,
                                            key: `${item.key}`,
                                        })
                                    )}
                                    ${bindProps({
                                        bind: ['counter'],
                                        props: ({ counter }) => {
                                            return {
                                                counter,
                                            };
                                        },
                                    })}
                                    ${delegateEvents({
                                        click: () => {
                                            /** @type {UpdateStateByName<MatrioskaItem>} */
                                            const updateActiveState =
                                                MobJs.updateStateByName(name);

                                            updateActiveState(
                                                'active',
                                                (val) => !val
                                            );
                                        },
                                    })}
                                >
                                </matrioska-item>
                                <matrioska-item
                                    class="matrioska-item--3"
                                    name="${name2}"
                                    ${staticProps(
                                        /** @type {MatrioskaItem['state']} */ ({
                                            level: 'level 3',
                                            value: item.value,
                                            key: `${item.key}`,
                                        })
                                    )}
                                    ${bindProps({
                                        bind: ['counter'],
                                        props: ({ counter }) => {
                                            return {
                                                counter,
                                            };
                                        },
                                    })}
                                    ${delegateEvents({
                                        click: () => {
                                            /** @type {UpdateStateByName<MatrioskaItem>} */
                                            const updateActiveState =
                                                MobJs.updateStateByName(name2);

                                            updateActiveState(
                                                'active',
                                                (val) => !val
                                            );
                                        },
                                    })}
                                >
                                </matrioska-item>
                            </div>
                        `;
                    })
                    .join('');
            },
        })}
    </div>`;
};

/** @type {MobComponent<Matrioska>} */
export const MatrioskaInvalidateFn = ({
    delegateEvents,
    updateState,
    staticProps,
    bindProps,
    invalidate,
    getState,
}) => {
    return html`<div class="matrioska">
        <div class="matrioska__head">
            ${getButtons({
                delegateEvents,
                updateState,
                invalidate,
                getState,
            })}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
            <span> First/Second level repeater without key. </span>
            <span> Third level repeater with key, shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${invalidate({
                    bind: 'level1',
                    render: () => {
                        const { level1 } = getState();

                        return level1
                            .map((item) => {
                                return html`
                                    <div
                                        class="matrioska__item-wrap matrioska__item-wrap--1"
                                    >
                                        <matrioska-item
                                            class="matrioska-item--1"
                                            ${staticProps(
                                                /** @type {MatrioskaItem['state']} */ ({
                                                    level: 'level 1',
                                                })
                                            )}
                                            ${bindProps({
                                                bind: ['counter'],
                                                /** @returns {ReturnBindProps<MatrioskaItem>} */
                                                props: ({ counter }) => {
                                                    return {
                                                        key: `${item.key}`,
                                                        value: `${item.value}`,
                                                        counter,
                                                    };
                                                },
                                            })}
                                        >
                                            ${getSecondLevel({
                                                staticProps,
                                                bindProps,
                                                delegateEvents,
                                                invalidate,
                                                getState,
                                            })}
                                        </matrioska-item>
                                    </div>
                                `;
                            })
                            .join('');
                    },
                })}
            </div>
        </div>
    </div>`;
};
