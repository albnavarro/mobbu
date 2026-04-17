import { htmlObject, html } from '@mobJs';
import { benchMarkListExternalPartial } from './bench-mark-list-external-partial';
import { externalBenchmarkStore } from '@stores/benchmark';
import { benchMarkUseProxi } from '../strategy';
import { BenchMarkFakeComponent } from '../fake-component/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponentType} from "../fake-component/type"
 */

/** @type {MobComponent<import('./type').BenchMarkExternal>} */
export const BenchMarkRepeatNoKyBindStoreFn = ({
    onMount,
    delegateEvents,
    bindObject,
    setRef,
    getRef,
    getState,
    bindProps,
    repeat,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            getRef()?.input.remove();
            externalBenchmarkStore.set('data', []);
            externalBenchmarkStore.set('time', 0);
            externalBenchmarkStore.set('counter', 0);
        };
    });

    return htmlObject({
        className: 'l-benchmark',
        content: [
            {
                className: 'header',
                content: [
                    {
                        tag: 'h3',
                        content: 'Repeat bind external store ( without key ):',
                    },
                    {
                        tag: 'p',
                        content: html`
                            Use extrernal store as state ( bindStore module
                            ).<br />
                            ( max value <strong>1000</strong> ).
                        `,
                    },
                    benchMarkListExternalPartial({
                        setRef,
                        getRef,
                        delegateEvents,
                        getState,
                        bindEffect,
                    }),
                    {
                        className: 'time',
                        content: bindObject`components generate in <strong>${() => proxi.time}ms</strong>`,
                    },
                ],
            },
            {
                className: 'list',
                content: repeat({
                    observe: () => proxi.data,
                    render: ({ current }) => {
                        return benchMarkUseProxi
                            ? htmlObject({
                                  component: BenchMarkFakeComponent,
                                  modules: [
                                      bindProps(
                                          /** @returns {ReturnBindProps<BenchMarkFakeComponentType>} */
                                          () => ({
                                              index: current.index,
                                              label: current.value.label,
                                              counter: proxi.counter,
                                          })
                                      ),
                                  ],
                              })
                            : htmlObject({
                                  component: BenchMarkFakeComponent,
                                  modules: [
                                      bindProps({
                                          observe: ['counter'],
                                          /** @returns {ReturnBindProps<BenchMarkFakeComponentType>} */
                                          props: (
                                              { counter },
                                              value,
                                              index
                                          ) => ({
                                              index: index,
                                              label: value['label'],
                                              counter: counter,
                                          }),
                                      }),
                                  ],
                              });
                    },
                }),
            },
        ],
    });
};
