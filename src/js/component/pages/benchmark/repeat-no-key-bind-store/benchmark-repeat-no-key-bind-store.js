import { fromObject, html } from '@mobJs';
import { benchMarkListExternalPartial } from './bench-mark-list-external-partial';
import { externalBenchmarkStore } from '@stores/benchmark';
import { benchMarkUseProxi } from '../strategy';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponent} from "../fake-component/type"
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

    return fromObject({
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
                    useSync: true,
                    render: ({ sync, current }) => {
                        return benchMarkUseProxi
                            ? fromObject({
                                  tag: 'benchmark-fake-component',
                                  modules: [
                                      bindProps(
                                          /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
                                          () => ({
                                              index: current.index,
                                              label: current.value.label,
                                              counter: proxi.counter,
                                          })
                                      ),
                                      sync(),
                                  ],
                              })
                            : fromObject({
                                  tag: 'benchmark-fake-component',
                                  modules: [
                                      bindProps({
                                          observe: ['counter'],
                                          /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
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
                                      sync(),
                                  ],
                              });
                    },
                }),
            },
        ],
    });
};
