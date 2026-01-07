//@ts-check

import { html } from '@mobJs';

/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').Move3DPage>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiState<import('./type').Move3DPage>} params.proxi
 */
const getControls = ({ delegateEvents, bindEffect, bindObject, proxi }) => {
    return html`<div
        class="c-move3d-page__controls"
        ${bindEffect({
            toggleClass: {
                active: () => proxi.controlsActive,
            },
        })}
    >
        <button
            type="button"
            class="c-canvas__controls__close"
            ${delegateEvents({
                click: () => {
                    proxi.controlsActive = false;
                },
            })}
        ></button>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxi.factor}
                    ${delegateEvents({
                        input: (/** @type {KeyboardEvent} */ event) => {
                            const value =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxi.factor = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindObject`factor: ${() => proxi.factor}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxi.xDepth}
                    ${delegateEvents({
                        input: (/** @type {KeyboardEvent} */ event) => {
                            const value =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxi.xDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindObject`xDepth: ${() => proxi.xDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxi.xLimit}
                    max=${proxi.xLimit}
                    ${delegateEvents({
                        input: (/** @type {KeyboardEvent} */ event) => {
                            const value =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxi.xLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindObject`xLimit: ${() => proxi.xLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxi.yDepth}
                    ${delegateEvents({
                        input: (/** @type {KeyboardEvent} */ event) => {
                            const value =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxi.yDepth = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindObject`yDepth: ${() => proxi.yDepth}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <div class="c-move3d-page__controls__range">
                <input
                    type="range"
                    value=${proxi.yLimit}
                    max=${proxi.yLimit}
                    ${delegateEvents({
                        input: (/** @type {KeyboardEvent} */ event) => {
                            const value =
                                /** @type {HTMLInputElement} */ (event.target)
                                    .value ?? 0;
                            proxi.yLimit = Number(value);
                        },
                    })}
                />
            </div>
            <div>${bindObject`yLimit: ${() => proxi.yLimit}`}</div>
        </div>
        <div class="c-move3d-page__controls__block">
            <button
                type="button"
                class="c-move3d-page__controls__button"
                ${delegateEvents({
                    click: () => {
                        proxi.debug = !proxi.debug;
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
    bindEffect,
}) => {
    const proxi = getProxi();

    return html`<div>
        <button
            type="button"
            class="c-move3d-page__controls__open"
            ${delegateEvents({
                click: () => {
                    proxi.controlsActive = true;
                },
            })}
        >
            show controls
        </button>
        ${getControls({ delegateEvents, bindEffect, bindObject, proxi })}
        <move-3d
            ${bindProps(
                /** @returns {ReturnBindProps<import('../../common/move-3d/type').Move3D>} */
                () => ({
                    shape: proxi.data,
                    xDepth: proxi.xDepth,
                    yDepth: proxi.yDepth,
                    xLimit: proxi.xLimit,
                    yLimit: proxi.yLimit,
                    factor: proxi.factor,
                    debug: proxi.debug,
                })
            )}
        ></move-3d>
    </div>`;
};
