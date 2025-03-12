//@ts-check

import { html } from '../../../mobjs';

/**
 * @import { BindObject, DelegateEvents, MobComponent, ProxiState, ReturnBindProps } from '../../../mobjs/type';
 **/

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @param {ProxiState<import('./type').Move3DPage>} params.proxiState
 */
const getControls = ({ delegateEvents, bindObject, proxiState }) => {
    return html`<div class="c-move3d-page__controls">
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.factor}
                    ${delegateEvents({
                        input: (/** @type{KeyboardEvent} */ event) => {
                            const value =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxiState.factor = Number(value);
                        },
                    })}
                />
            </div>
            <div>
                ${bindObject`factor: ${{ bind: 'factor', value: () => proxiState.factor }}`}
            </div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.xDepth}
                    ${delegateEvents({
                        input: (/** @type{KeyboardEvent} */ event) => {
                            const value =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxiState.xDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>
                ${bindObject`xDepth: ${{ bind: 'xDepth', value: () => proxiState.xDepth }}`}
            </div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.xLimit}
                    max=${proxiState.xLimit}
                    ${delegateEvents({
                        input: (/** @type{KeyboardEvent} */ event) => {
                            const value =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxiState.xLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>
                ${bindObject`xLimit: ${{ bind: 'xLimit', value: () => proxiState.xLimit }}`}
            </div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.yDepth}
                    ${delegateEvents({
                        input: (/** @type{KeyboardEvent} */ event) => {
                            const value =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxiState.yDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>
                ${bindObject`yDepth: ${{ bind: 'yDepth', value: () => proxiState.yDepth }}`}
            </div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxiState.yLimit}
                    max=${proxiState.yLimit}
                    ${delegateEvents({
                        input: (/** @type{KeyboardEvent} */ event) => {
                            const value =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxiState.yLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>
                ${bindObject`yLimit: ${{ bind: 'yLimit', value: () => proxiState.yLimit }}`}
            </div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${delegateEvents({
                    click: () => {
                        proxiState.debug = !proxiState.debug;
                    },
                })}
            >
                Toggle Debug
            </button>
        </div>
    </div>`;
};

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({
    bindProps,
    delegateEvents,
    bindObject,
    getProxi,
}) => {
    const proxiState = getProxi();

    return html`<div>
        ${getControls({ delegateEvents, bindObject, proxiState })}
        <move-3d
            ${bindProps({
                bind: [
                    'data',
                    'xDepth',
                    'yDepth',
                    'xLimit',
                    'yLimit',
                    'factor',
                    'debug',
                ],
                /** @returns{ReturnBindProps<import('../../common/Move3D/type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        yDepth: proxiState.yDepth,
                        xLimit: proxiState.xLimit,
                        yLimit: proxiState.yLimit,
                        factor: proxiState.factor,
                        debug: proxiState.debug,
                    };
                },
            })}
        ></move-3d>
        <move-3d
            ${bindProps({
                bind: [
                    'data',
                    'xDepth',
                    'yDepth',
                    'xLimit',
                    'yLimit',
                    'factor',
                    'debug',
                ],
                /** @returns{ReturnBindProps<import('../../common/Move3D/type').Move3D>} */
                props: () => {
                    return {
                        shape: proxiState.data,
                        xDepth: proxiState.xDepth,
                        yDepth: proxiState.yDepth,
                        xLimit: proxiState.xLimit,
                        yLimit: proxiState.yLimit,
                        factor: proxiState.factor,
                        debug: proxiState.debug,
                    };
                },
            })}
        ></move-3d>
    </div>`;
};
