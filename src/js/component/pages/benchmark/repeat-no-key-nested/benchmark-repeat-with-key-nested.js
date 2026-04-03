//@ts-check

import { html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponent} from "../fake-component/type"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithNoKeyFnNested = ({
    onMount,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    bindProps,
    repeat,
    bindObject,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            // Chorme leak memory with input, maintain reference.
            getRef()?.input.remove();
        };
    });

    return html`<div class="l-benchmark">
        <div class="header">
            <h3>Repeat ( nested without key ):</h3>
            <p>
                Repater without component with the same repeater with component
                inside<br />
                ( max value <strong>10</strong> ).
            </p>
            ${benchMarkListPartial({
                setRef,
                getRef,
                delegateEvents,
                bindEffect,
                proxi,
            })}

            <div class="time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${repeat({
                observe: () => proxi.data,
                useSync: true,
                render: ({ current }) => {
                    return html`<div>
                        <div class="static-item-inner">
                            ${bindObject`label: ${() => current.value.label}`}
                        </div>
                        <div>
                            ${repeat({
                                observe: () => proxi.data,
                                useSync: true,
                                render: ({ sync, current }) => {
                                    return html`
                                        <benchmark-fake-component
                                            ${bindProps(
                                                /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
                                                () => ({
                                                    index: current.index,
                                                    label: current.value.label,
                                                    counter: proxi.counter,
                                                })
                                            )}
                                            ${sync()}
                                        >
                                        </benchmark-fake-component>
                                    `;
                                },
                            })}
                        </div>
                    </div>`;
                },
            })}
        </div>
    </div>`;
};
