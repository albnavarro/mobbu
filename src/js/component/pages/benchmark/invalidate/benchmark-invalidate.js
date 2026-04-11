//@ts-check

import { fromObject, html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponent} from "../fake-component/type"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkInvalidateFn = ({
    onMount,
    delegateEvents,
    bindObject,
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

    return fromObject({
        className: 'l-benchmark',
        content: [
            {
                className: 'header',
                content: [
                    {
                        tag: 'h3',
                        content: 'Invalidate:',
                    },
                    {
                        tag: 'h2',
                        content: 'Generate components performance',
                    },
                    {
                        tag: 'p',
                        content: html`
                            Invalidate a large list of components with 5
                            reactive elements inside.<br />
                            ( max component <strong>1000</strong> ).
                        `,
                    },
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
                content: invalidate({
                    observe: () => proxi.data,
                    render: () => {
                        const { data } = getState();

                        return fromObject({
                            className: 'list',
                            content: data.map(({ label }, index) => {
                                return fromObject({
                                    tag: 'benchmark-fake-component',
                                    modules: [
                                        staticProps(
                                            /** @type {import('../fake-component/type').BenchMarkFakeComponent['props']} */
                                            ({
                                                label,
                                                index,
                                            })
                                        ),
                                        bindProps(
                                            /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
                                            () => ({
                                                counter: proxi.counter,
                                            })
                                        ),
                                    ],
                                });
                            }),
                        });
                    },
                }),
            },
        ],
    });
};
