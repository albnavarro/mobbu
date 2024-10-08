//@ts-check

/**
 * @import { MobComponent, DelegateEvents, UpdateState, BindProps, StaticProps, Repeat, SetStateByName, UpdateStateByName, SetRef } from '../../../mobjs/type'
 * @import { Matrioska } from './type'
 * @import { MatrioskaItem } from './matrioskaItem/type'
 * @import { CodeButton } from '../../common/codeButton/type';
 */

import { getLegendData } from '../../../data';
import { mobCore } from '../../../mobCore';
import { html, setStateByName, updateStateByName } from '../../../mobjs';

const buttons = [
    {
        state: 'level1',
        ref: 'level1_counter',
        label_plus: 'level1 +',
        label_minus: 'level1 -',
    },
    {
        state: 'level2',
        ref: 'level2_counter',
        label_plus: 'level2 +',
        label_minus: 'level2 -',
    },
    {
        state: 'level3',
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
 * @param { object } params
 * @param { DelegateEvents } params.delegateEvents
 * @param { UpdateState<Matrioska> } params.updateState
 * @param { SetRef } params.setRef
 */
const getButtons = ({ delegateEvents, updateState, setRef }) => {
    return html`
        ${buttons
            .map((button) => {
                return html` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                updateState(
                                    /** @type {'level1'|'level2'|'level3'} */ (
                                        button.state
                                    ),
                                    (val) => {
                                        return [
                                            ...val,
                                            {
                                                key: getRandomInt(1000),
                                                value: mobCore.getUnivoqueId(),
                                            },
                                        ];
                                    }
                                );
                            },
                        })}
                        >${button.label_plus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                updateState(
                                    /** @type {'level1'|'level2'|'level3'} */ (
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
                    <div
                        class="matrioska__head__counter"
                        ${setRef(button.ref)}
                    ></div>
                </div>`;
            })
            .join('')}
    `;
};

/**
 * @param { object } params
 * @param { Repeat<Matrioska> } params.repeat
 * @param { StaticProps<MatrioskaItem> } params.staticProps
 * @param { BindProps<Matrioska,MatrioskaItem> } params.bindProps
 * @param { DelegateEvents } params.delegateEvents
 */
const getSecondLevel = ({ repeat, staticProps, bindProps, delegateEvents }) => {
    return html`
        <div class="matrioska__level matrioska__level--2">
            ${repeat({
                bind: 'level2',
                render: ({ html, sync }) => {
                    return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--2"
                        >
                            <matrioska-item
                                class="matrioska-item--2"
                                ${staticProps({
                                    level: 'level 2',
                                })}
                                ${bindProps({
                                    bind: ['counter'],
                                    props: ({ level2, counter }, index) => {
                                        return {
                                            key: `${level2[index]?.key}`,
                                            value: `${level2[index]?.value}`,
                                            counter,
                                        };
                                    },
                                })}
                                ${sync()}
                            >
                                ${getThirdLevel({
                                    repeat,
                                    staticProps,
                                    delegateEvents,
                                    bindProps,
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
 * @param { object } params
 * @param { Repeat<Matrioska> } params.repeat
 * @param { StaticProps<MatrioskaItem> } params.staticProps
 * @param { BindProps<Matrioska,MatrioskaItem> } params.bindProps
 * @param { DelegateEvents } params.delegateEvents
 */
const getThirdLevel = ({ repeat, staticProps, bindProps, delegateEvents }) => {
    return html`
        <div class="matrioska__level matrioska__level--3">
            ${repeat({
                bind: 'level3',
                key: 'key',
                render: ({ html, sync }) => {
                    const name = mobCore.getUnivoqueId();
                    const name2 = mobCore.getUnivoqueId();

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
                                ${bindProps({
                                    bind: ['counter'],
                                    props: ({ level3, counter }, index) => {
                                        return {
                                            key: `${level3[index]?.key}`,
                                            value: `${level3[index]?.value}`,
                                            counter,
                                        };
                                    },
                                })}
                                ${delegateEvents({
                                    click: () => {
                                        /** @type {UpdateStateByName<MatrioskaItem>} */
                                        const updateActiveState =
                                            updateStateByName(name);

                                        updateActiveState(
                                            'active',
                                            (val) => !val
                                        );
                                    },
                                })}
                                ${sync()}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name2}"
                                ${staticProps({
                                    level: 'level 3',
                                })}
                                ${bindProps({
                                    bind: ['counter'],
                                    props: ({ level3, counter }, index) => {
                                        return {
                                            key: `${level3[index]?.key}`,
                                            value: `${level3[index]?.value}`,
                                            counter,
                                        };
                                    },
                                })}
                                ${delegateEvents({
                                    click: () => {
                                        /** @type {UpdateStateByName<MatrioskaItem>} */
                                        const updateActiveState =
                                            updateStateByName(name2);
                                        updateActiveState(
                                            'active',
                                            (val) => !val
                                        );
                                    },
                                })}
                                ${sync()}
                            >
                            </matrioska-item>
                        </div>
                    `;
                },
            })}
        </div>
    `;
};

/** @type { MobComponent<Matrioska> } */
export const MatrioskaFn = ({
    html,
    onMount,
    delegateEvents,
    updateState,
    repeat,
    staticProps,
    bindProps,
    watchSync,
    setRef,
    getRef,
}) => {
    /** @type { SetStateByName<CodeButton> } */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(() => {
        const { level3_counter, level2_counter, level1_counter } = getRef();

        watchSync('level1', (val) => {
            level1_counter.innerHTML = `Number of items: ${val.length} ( max 5 )`;
        });

        watchSync('level2', (val) => {
            level2_counter.innerHTML = `Number of items: ${val.length} ( max 10 )`;
        });

        watchSync('level3', (val) => {
            level3_counter.innerHTML = `Number of items: ${val.length} ( max 10 )`;
        });

        /**
         * Code button
         */
        const { matrioska } = getLegendData();
        const { source } = matrioska;
        setCodeButtonState('drawers', [
            {
                label: 'description',
                source: source.description,
            },
            {
                label: 'definition',
                source: source.definition,
            },
            {
                label: 'main',
                source: source.mainComponent,
            },
            {
                label: 'cards',
                source: source.cards,
            },
        ]);
        setCodeButtonState('color', 'black');

        return () => {
            setCodeButtonState('drawers', []);
        };
    });

    return html`<div class="matrioska">
        <div class="matrioska__head">
            ${getButtons({ delegateEvents, updateState, setRef })}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
            <span> First/Second level repeater without key. </span>
            <span> Third level repeater with key, shuffle order. </span>
        </h4>
        <div class="matrioska__head__cta">
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
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
                    bind: 'level1',
                    render: ({ html, sync }) => {
                        return html`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${staticProps({ level: 'level 1' })}
                                    ${bindProps({
                                        bind: ['counter'],
                                        /** @returns{Partial<MatrioskaItem>} */
                                        props: ({ level1, counter }, index) => {
                                            return {
                                                key: `${level1[index]?.key}`,
                                                value: `${level1[index]?.value}`,
                                                counter,
                                            };
                                        },
                                    })}
                                    ${sync()}
                                >
                                    ${getSecondLevel({
                                        repeat,
                                        staticProps,
                                        bindProps,
                                        delegateEvents,
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
