//@ts-check

import { html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';

/**
 * @import {MobComponent, ReturnBindProps} from '@mobJsType';
 * @import {BenchMarkFakeComponent} from '../fake-component/type';
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithKyFnNested = ({
    onMount,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    setState,
    updateState,
    bindProps,
    repeat,
    bindObject,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        return () => {};
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside.
            </p>
            ${benchMarkListPartial({
                setRef,
                getRef,
                setState,
                updateState,
                delegateEvents,
                getState,
                bindEffect,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                bind: () => proxi.data,
                key: 'label',
                useSync: true,
                render: ({ current }) => {
                    return html`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${bindObject`label: ${() => current.value.label}`}
                        </div>
                        <div>
                            ${repeat({
                                bind: () => proxi.data,
                                useSync: true,
                                key: 'label',
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
