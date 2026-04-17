import { htmlObject } from '@mobJs';
import { benchMarkGarbagePartial } from '../partials/bench-mark-garbage-partial';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';
import { benchMarkUseProxi } from '../strategy';
import { BenchMarkFakeComponent } from '../fake-component/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponentType} from "../fake-component/type"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoKyFn = ({
    onMount,
    delegateEvents,
    setRef,
    getRef,
    bindProps,
    repeat,
    bindEffect,
    getProxi,
    bindObject,
}) => {
    const proxi = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            // Chorme leak memory with input, maintain reference.
            getRef()?.input.remove();
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
                        content: 'Repeat ( without key ):',
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
