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
        <div class="matrioska__level">
            ${repeat({
                watch: 'level2',
                render: ({ html, sync }) => {
                    return html`<matrioska-item
                        ${staticProps({
                            level: 'level 2',
                        })}
                        ${bindProps({
                            props: ({ level2 }, index) => {
                                return {
                                    key: `${level2[index].key}`,
                                    value: `${level2[index].value}`,
                                };
                            },
                        })}
                        ${sync}
                    >
                        ${getThirdLevel({ repeat, staticProps, bindProps })}
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
        <div class="matrioska__level">
            ${repeat({
                watch: 'level3',
                render: ({ html, sync }) => {
                    return html`<matrioska-item
                        ${staticProps({
                            level: 'level 3',
                        })}
                        ${bindProps({
                            props: ({ level3 }, index) => {
                                return {
                                    key: `${level3[index].key}`,
                                    value: `${level3[index].value}`,
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
}) => {
    onMount(() => {
        return () => {};
    });

    return html`<div>
        <div class="matrioska__head">
            ${getButtons({ delegateEvents, setState })}
        </div>
        <div class="matrioska__body">
            <div class="matrioska__level1">
                ${repeat({
                    watch: 'level1',
                    render: ({ html, sync }) => {
                        return html`<matrioska-item
                            ${staticProps({ level: 'level 1' })}
                            ${bindProps({
                                /**@returns{Partial<import('./matrioskaItem/type').MatrioskaItem>} */
                                props: ({ level1 }, index) => {
                                    return {
                                        key: `${level1[index].key}`,
                                        value: `${level1[index].value}`,
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
