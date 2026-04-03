//@ts-check

import { html } from '@mobJs';
import { benchMarkGarbagePartial } from '../partials/bench-mark-garbage-partial';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';
import { benchMarkUseProxi } from '../strategy';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponent} from "../fake-component/type"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithKyFn = ({
    onMount,
    delegateEvents,
    bindObject,
    setRef,
    getRef,
    bindProps,
    repeat,
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
            <h3>Repeat ( with key ):</h3>
            <h2>Generate components performance</h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
                setRef,
                getRef,
                delegateEvents,
                bindEffect,
                proxi,
            })}

            <div class="time">
                ${bindObject`components generate in <strong>${() => proxi.time}ms</strong>`}
            </div>
        </div>
        <div class="list">
            ${repeat({
                observe: () => proxi.data,
                useSync: true,
                key: 'label',
                render: ({ sync, current }) => {
                    return benchMarkUseProxi
                        ? html`
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
                          `
                        : html`
                              <benchmark-fake-component
                                  ${bindProps({
                                      observe: ['counter'],
                                      /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
                                      props: ({ counter }, value, index) => ({
                                          index: index,
                                          label: value['label'],
                                          counter: counter,
                                      }),
                                  })}
                                  ${sync()}
                              >
                              </benchmark-fake-component>
                          `;
                },
            })}
        </div>
    </div>`;
};
