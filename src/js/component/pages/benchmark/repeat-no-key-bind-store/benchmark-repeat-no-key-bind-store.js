import { htmlObject } from '@mobJs';
import { benchMarkListExternalPartial } from './bench-mark-list-external-partial';
import { externalBenchmarkStore } from '@stores/benchmark';
import { benchMarkUseProxi } from '../strategy';
import { BenchMarkFakeComponent } from '../fake-component/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from '@mobJsType'
 * @import {BenchMarkFakeComponentType} from '../fake-component/type'
 */

/** @type {MobComponent<import('./type').BenchMarkExternal>} */
export const BenchMarkRepeatNoKyBindStoreFn = ({
    onMount,
    delegateEvents,
    bindObject,
    setRef,
    getRef,
    bindProps,
    repeat,
    bindEffect,
    getBoundedProxi,
}) => {
    const boundedProxi = getBoundedProxi();

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
                        content: /* HTML */ `
                            Generates and updates a large list of vanilla HTML
                            element with 4 reactive elements inside.<br />
                            ( max component <strong>1000</strong> ).
                        `,
                    },
                    benchMarkListExternalPartial({
                        setRef,
                        getRef,
                        delegateEvents,
                        boundedProxi,
                        bindEffect,
                    }),
                    {
                        className: 'time',
                        content: bindObject`components generate in <strong>${() => boundedProxi.time}ms</strong>`,
                    },
                ],
            },
            {
                className: 'list',
                content: repeat({
                    observe: () => boundedProxi.data,
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
                                              counter: boundedProxi.counter,
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
