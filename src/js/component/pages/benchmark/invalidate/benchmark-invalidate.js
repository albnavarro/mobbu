//@ts-check

import { html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkInvalidateFn = ({
    onMount,
    delegateEvents,
    bindText,
    invalidate,
    getState,
    staticProps,
    setRef,
    getRef,
    bindProps,
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
            <h3>Invalidate:</h3>
            <h2>Generate components performance</h2>
            <p>
                Invalidate a large list of components with 5 reactive elements
                inside.<br />
                ( max component <strong>1000</strong> ).
            </p>
            ${benchMarkListPartial({
                setRef,
                getRef,
                proxi,
                delegateEvents,
                bindEffect,
            })}

            <div class="time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${invalidate({
                observe: () => proxi.data,
                render: () => {
                    const { data } = getState();

                    return html`
                        ${data
                            .map(({ label }, index) => {
                                return html`
                                    <benchmark-fake-component
                                        ${staticProps(
                                            /** @type {import('../fake-component/type').BenchMarkFakeComponent['props']} */ ({
                                                label,
                                                index,
                                            })
                                        )}
                                        ${bindProps(
                                            /**
                                             * @returns {ReturnBindProps<
                                             *     import('../fake-component/type').BenchMarkFakeComponent
                                             * >}
                                             */
                                            () => ({
                                                counter: proxi.counter,
                                            })
                                        )}
                                    ></benchmark-fake-component>
                                `;
                            })
                            .join('')}
                    `;
                },
            })}
        </div>
    </div>`;
};
