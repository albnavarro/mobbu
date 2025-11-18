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
export const BenchMarkRepeatNoKyFn = ({
    onMount,
    delegateEvents,
    bindText,
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

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
                setRef,
                getRef,
                delegateEvents,
                bindEffect,
                proxi,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                observe: () => proxi.data,
                useSync: true,
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
