//@ts-check

import { html, MobJs } from '@mobJs';

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiState,
 *   SetRef
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {ProxiState<import('./type').RosaDiGrandiPage>} params.proxi
 * @param {SetRef<import('./type').RosaDiGrandiPage>} params.setRef
 * @param {GetRef<import('./type').RosaDiGrandiPage>} params.getRef
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 */
const getControls = ({ proxi, delegateEvents, bindObject }) => {
    return html`
        <li class="l-rosa__controls__item">
            <span for="numerators" class="l-rosa__controls__label">
                ${bindObject`numerators: <strong>${() => proxi.numeratorsLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    id="numerators"
                    type="range"
                    min="0"
                    max="10"
                    value="${proxi.numerators}"
                    step="1"
                    ${delegateEvents({
                        input: (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.numeratorsLabel = Number(value);
                        },
                        change: (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.numerators = Number(value);
                        },
                    })}
                />
            </div>
        </li>
        <li class="l-rosa__controls__item">
            <span for="denominator" class="l-rosa__controls__label">
                ${bindObject`denominator: <strong>${() => proxi.denominatorLabel}</strong>`}
            </span>
            <div class="l-rosa__controls__range">
                <input
                    type="range"
                    id="denominator"
                    min="0"
                    max="10"
                    value="${proxi.denominator}"
                    step="1"
                    ${delegateEvents({
                        input: (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.denominatorLabel = Number(value);
                        },
                        change: (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.denominator = Number(value);
                        },
                    })}
                />
            </div>
        </li>
    `;
};

/** @type {MobComponent<import('./type').RosaDiGrandiPage>} */
export const RosaDiGrandiPageFn = ({
    getProxi,
    delegateEvents,
    invalidate,
    bindEffect,
    getRef,
    setRef,
    bindObject,
}) => {
    const proxi = getProxi();

    return html`<div class="l-rosa">
        <button
            type="button"
            class="l-rosa__controls__open"
            ${delegateEvents({
                click: () => {
                    proxi.controlsActive = true;
                },
            })}
        >
            show controls
        </button>
        <ul
            class="l-rosa__controls"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.controlsActive,
                },
            })}
        >
            <button
                type="button"
                class="l-rosa__controls__close"
                ${delegateEvents({
                    click: () => {
                        proxi.controlsActive = false;
                    },
                })}
            ></button>
            ${getControls({
                proxi,
                getRef,
                setRef,
                delegateEvents,
                bindObject,
            })}
        </ul>
        <div class="l-rosa__wrap">
            ${invalidate({
                observe: [() => proxi.numerators, () => proxi.denominator],
                render: () => {
                    return html`
                        <math-animation
                            ${MobJs.staticProps({
                                name: 'rosaDiGrandi',
                                showNavigation: false,
                                numberOfStaggers: 10,
                                args: [
                                    proxi.numerators,
                                    proxi.denominator,
                                    proxi.duration,
                                    proxi.staggerEach,
                                ],
                            })}
                        ></math-animation>
                    `;
                },
            })}
        </div>
    </div>`;
};
