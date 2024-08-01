//@ts-check

import { mobCore } from '../../../mobCore';
import { html } from '../../../mobjs';

/**
 * @param {object} params
 * @param {import('../../../mobjs/type').DelegateEvents} params.delegateEvents
 * @param {import('../../../mobjs/type').SetState<import('./type').Matrioska>} params.setState
 */
const getButtons = ({ delegateEvents, setState }) => {
    return html`
        <!-- level 1 -->
        <div class="matrioska__head__item">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level1', (val) => {
                            return [
                                ...val,
                                {
                                    key: val.length + 1,
                                    value: mobCore.getUnivoqueId(),
                                },
                            ];
                        });
                    },
                })}
                >level 1 +</dynamic-list-button
            >
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level1', (val) => {
                            return val.slice(0, -1);
                        });
                    },
                })}
                >level 1 -</dynamic-list-button
            >
            <div class="matrioska__head__counter" ref="level1_counter"></div>
        </div>

        <!-- level 2 -->
        <div class="matrioska__head__item">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level2', (val) => {
                            return [
                                ...val,
                                {
                                    key: val.length + 1,
                                    value: mobCore.getUnivoqueId(),
                                },
                            ];
                        });
                    },
                })}
                >level 2 +</dynamic-list-button
            >
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level2', (val) => {
                            return val.slice(0, -1);
                        });
                    },
                })}
                >level 2 -</dynamic-list-button
            >
            <div class="matrioska__head__counter" ref="level2_counter"></div>
        </div>

        <!-- level 3 -->
        <div class="matrioska__head__item">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level3', (val) => {
                            return [
                                ...val,
                                {
                                    key: val.length + 1,
                                    value: mobCore.getUnivoqueId(),
                                },
                            ];
                        });
                    },
                })}
                >level 3 +</dynamic-list-button
            >
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        setState('level3', (val) => {
                            return val.slice(0, -1);
                        });
                    },
                })}
                >level 3 -</dynamic-list-button
            >
            <div class="matrioska__head__counter" ref="level3_counter"></div>
        </div>
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
                watch: 'level2',
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
                watch: 'level3',
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
    onMount(({ ref }) => {
        const { level3_counter, level2_counter, level1_counter } = ref;

        watchSync('level1', (val) => {
            level1_counter.innerHTML = `Number of items: ${val.length}`;
        });

        watchSync('level2', (val) => {
            level2_counter.innerHTML = `Number of items: ${val.length}`;
        });

        watchSync('level3', (val) => {
            level3_counter.innerHTML = `Number of items: ${val.length}`;
        });

        return () => {};
    });

    return html`<div>
        <only-desktop></only-desktop>
        <div class="matrioska__head">
            ${getButtons({ delegateEvents, setState })}
        </div>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
                    watch: 'level1',
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
