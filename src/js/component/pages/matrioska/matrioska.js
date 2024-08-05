//@ts-check

import { getLegendData } from '../../../data';
import { mobCore } from '../../../mobCore';
import { html, setStateByName } from '../../../mobjs';

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

/**
 * @param {object} params
 * @param {import('../../../mobjs/type').DelegateEvents} params.delegateEvents
 * @param {import('../../../mobjs/type').SetState<import('./type').Matrioska>} params.setState
 */
const getButtons = ({ delegateEvents, setState }) => {
    return html`
        ${buttons
            .map((button) => {
                return html` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                // @ts-ignore
                                setState(button.state, (val) => {
                                    return val.length < 10
                                        ? [
                                              ...val,
                                              {
                                                  key: val.length + 1,
                                                  value: mobCore.getUnivoqueId(),
                                              },
                                          ]
                                        : val;
                                });
                            },
                        })}
                        >${button.label_plus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
                            click: () => {
                                // @ts-ignore
                                setState(button.state, (val) => {
                                    return val.slice(0, -1);
                                });
                            },
                        })}
                        >${button.label_minus}</dynamic-list-button
                    >
                    <div
                        class="matrioska__head__counter"
                        ref=${button.ref}
                    ></div>
                </div>`;
            })
            .join('')}
    `;
};

/**
 * @param {object} params
 * @param {import('../../../mobjs/type').Repeat<import('./type').Matrioska>} params.repeat
 * @param {import('../../../mobjs/type').StaticProps<import('./matrioskaItem/type').MatrioskaItem>} params.staticProps
 * @param {import('../../../mobjs/type').BindProps<import('./type').Matrioska,import('./matrioskaItem/type').MatrioskaItem>} params.bindProps
 */
const getSecondLevel = ({ repeat, staticProps, bindProps }) => {
    return html`
        <div class="matrioska__level matrioska__level--2">
            ${repeat({
                bind: 'level2',
                render: ({ html, sync }) => {
                    return html`<matrioska-item
                        class="matrioska-item--2"
                        ${staticProps({
                            level: 'level 2',
                        })}
                        ${bindProps({
                            props: ({ level2 }, index) => {
                                return {
                                    key: `${level2[index]?.key ?? 'not_found'}`,
                                    value: `${level2[index]?.value ?? 'not_found'}`,
                                };
                            },
                        })}
                        ${sync}
                    >
                        ${getThirdLevel({
                            repeat,
                            staticProps,
                            bindProps,
                        })}
                    </matrioska-item> `;
                },
            })}
        </div>
    `;
};

/**
 * @param {object} params
 * @param {import('../../../mobjs/type').Repeat<import('./type').Matrioska>} params.repeat
 * @param {import('../../../mobjs/type').StaticProps<import('./matrioskaItem/type').MatrioskaItem>} params.staticProps
 * @param {import('../../../mobjs/type').BindProps<import('./type').Matrioska,import('./matrioskaItem/type').MatrioskaItem>} params.bindProps
 */
const getThirdLevel = ({ repeat, staticProps, bindProps }) => {
    return html`
        <div class="matrioska__level matrioska__level--3">
            ${repeat({
                bind: 'level3',
                render: ({ html, sync }) => {
                    return html`<matrioska-item
                        class="matrioska-item--3"
                        ${staticProps({
                            level: 'level 3',
                        })}
                        ${bindProps({
                            props: ({ level3 }, index) => {
                                return {
                                    key: `${level3[index]?.key ?? 'not_found'}`,
                                    value: `${level3[index]?.value ?? 'not_found'}`,
                                };
                            },
                        })}
                        ${sync}
                    >
                    </matrioska-item> `;
                },
            })}
        </div>
    `;
};

/**
 * @type {import("../../../mobjs/type").mobComponent<import('./type').Matrioska>}
 */
export const MatrioskaFn = ({
    html,
    onMount,
    delegateEvents,
    setState,
    repeat,
    staticProps,
    bindProps,
    watchSync,
}) => {
    /**
     * @type {import('../../../mobjs/type').SetStateByName<import('../../common/codeButton/type').CodeButton>}
     */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(({ ref }) => {
        const { level3_counter, level2_counter, level1_counter } = ref;

        watchSync('level1', (val) => {
            level1_counter.innerHTML = `Number of items: ${val.length} ( max 10 )`;
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
        <only-desktop></only-desktop>
        <div class="matrioska__head">
            ${getButtons({ delegateEvents, setState })}
        </div>
        <h4 class="matrioska__head__title">
            Nested repater like matrioska in same component.
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
                    bind: 'level1',
                    render: ({ html, sync }) => {
                        return html`<matrioska-item
                            class="matrioska-item--1"
                            ${staticProps({ level: 'level 1' })}
                            ${bindProps({
                                /**@returns{Partial<import('./matrioskaItem/type').MatrioskaItem>} */
                                props: ({ level1 }, index) => {
                                    return {
                                        key: `${level1[index]?.key ?? 'not_found'}`,
                                        value: `${level1[index]?.value ?? 'not_found'}`,
                                    };
                                },
                            })}
                            ${sync}
                        >
                            ${getSecondLevel({
                                repeat,
                                staticProps,
                                bindProps,
                            })}
                        </matrioska-item> `;
                    },
                })}
            </div>
        </div>
    </div>`;
};
