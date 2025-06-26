//@ts-check

/**
 * @import {MobComponent, DelegateEvents, UpdateState, BindProps, StaticProps, Repeat,  UpdateStateByName, Invalidate, GetState, ReturnBindProps} from '@mobJsType'
 * @import {Matrioska} from './type'
 * @import {MatrioskaItem} from './item/type'
 */

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';

const buttons = [
    {
        state: 'level1',
        maxItem: 10,
        ref: 'level1_counter',
        label_plus: 'level1 +',
        label_minus: 'level1 -',
    },
    {
        state: 'level2',
        maxItem: 10,
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
                            click: async () => {
                                updateState(
                                    /** @type {'level1' | 'level2' | 'level3'} */ (
                                        button.state
                                    ),
                                    (val) => {
                                        return val.slice(0, -1);
                                    }
                                );

                                await MobJs.tick();
                            },
                        })}
                        >${button.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: async () => {
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

                                await MobJs.tick();
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
 * @param {Repeat<Matrioska>} params.repeat
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {Matrioska['state']} params.proxi
 */
const getSecondLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return html`
        <div class="matrioska__level matrioska__level--2">
            ${repeat({
                bind: () => proxi.level2,
                render: ({ current }) => {
                    return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${staticProps({
                                    level: 'level 2',
                                })}
                                ${bindProps(
                                    /** @returns {ReturnBindProps<MatrioskaItem>} */
                                    () => ({
                                        key: `${current.value.key}`,
                                        value: `${current.value.value}`,
                                        index: current.index,
                                        counter: proxi.counter,
                                    })
                                )}
                            >
                                ${getThirdLevel({
                                    repeat,
                                    staticProps,
                                    delegateEvents,
                                    bindProps,
                                    proxi,
                                })}
                            </matrioska-item>
                        </div>
                    `;
                },
            })}
        </div>
    `;
};

/**
 * @param {object} params
 * @param {Repeat<Matrioska>} params.repeat
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {Matrioska['state']} params.proxi
 */
const getThirdLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return html`
        <div class="matrioska__level matrioska__level--3">
            ${repeat({
                bind: () => proxi.level3,
                render: ({ current }) => {
                    const name = MobCore.getUnivoqueId();
                    const name2 = MobCore.getUnivoqueId();

                    /**
                     * With key bind props is unnecessary here
                     */
                    return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name}"
                                ${staticProps({
                                    level: 'level 3',
                                })}
                                ${bindProps(
                                    /** @returns {ReturnBindProps<MatrioskaItem>} */
                                    () => ({
                                        key: `${current.value.key}`,
                                        value: `${current.value.value}`,
                                        index: current.index,
                                        counter: proxi.counter,
                                    })
                                )}
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
                                ${staticProps({
                                    level: 'level 3',
                                })}
                                ${bindProps({
                                    props: () => {
                                        return {
                                            key: `${current.value.key}`,
                                            value: `${current.value.value}`,
                                            index: current.index,
                                            counter: proxi.counter,
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
                },
            })}
        </div>
    `;
};

/** @type {MobComponent<Matrioska>} */
export const MatrioskaFn = ({
    delegateEvents,
    updateState,
    repeat,
    staticProps,
    bindProps,
    invalidate,
    getState,
    getProxi,
}) => {
    const proxi = getProxi();

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
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
                    bind: () => proxi.level1,
                    render: ({ current }) => {
                        return html`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${staticProps({ level: 'level 1' })}
                                    ${bindProps(
                                        /** @returns {ReturnBindProps<MatrioskaItem>} */
                                        () => ({
                                            key: `${current.value.key}`,
                                            value: `${current.value.value}`,
                                            index: current.index,
                                            counter: proxi.counter,
                                        })
                                    )}
                                >
                                    ${getSecondLevel({
                                        repeat,
                                        staticProps,
                                        bindProps,
                                        delegateEvents,
                                        proxi,
                                    })}
                                </matrioska-item>
                            </div>
                        `;
                    },
                })}
            </div>
        </div>
    </div>`;
};
