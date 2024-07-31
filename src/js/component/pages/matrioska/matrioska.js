//@ts-check

import { mobCore } from '../../../mobCore';

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
}) => {
    onMount(() => {
        return () => {};
    });

    return html`<div>
        <div class="matrioska__head">
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
        </div>
        <div class="matrioska__body">
            <div class="matrioska__level1">
                ${repeat({
                    watch: 'level1',
                    render: ({ html, sync }) => {
                        return html`<matrioska-item
                            ${staticProps({ level: 'level 1' })}
                            ${sync}
                        >
                            <div class="matrioska__level">
                                ${repeat({
                                    watch: 'level2',
                                    render: ({ html, sync }) => {
                                        return html`<matrioska-item
                                            ${staticProps({ level: 'level 2' })}
                                            ${sync}
                                        >
                                            <div class="matrioska__level">
                                                ${repeat({
                                                    watch: 'level3',
                                                    render: ({
                                                        html,
                                                        sync,
                                                    }) => {
                                                        return html`<matrioska-item
                                                            ${staticProps({
                                                                level: 'level 3',
                                                            })}
                                                            ${sync}
                                                        >
                                                        </matrioska-item> `;
                                                    },
                                                })}
                                            </div>
                                        </matrioska-item> `;
                                    },
                                })}
                            </div>
                        </matrioska-item> `;
                    },
                })}
            </div>
        </div>
    </div>`;
};
