import { fromObject } from '@mobJs';
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

    return fromObject({
        className: 'l-benchmark',
        content: [
            {
                className: 'header',
                content: [
                    {
                        tag: 'h3',
                        content: 'Repeat ( with key ):',
                    },
                    {
                        tag: 'h2',
                        content: 'Generate components performance',
                    },
                    benchMarkGarbagePartial(),
                    benchMarkListPartial({
                        setRef,
                        getRef,
                        delegateEvents,
                        bindEffect,
                        proxi,
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
                    key: 'label',
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
