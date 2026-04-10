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
export const BenchMarkRepeatWithNoKeyFnNested = ({
    onMount,
    delegateEvents,
    setRef,
    getRef,
    bindProps,
    repeat,
    bindObject,
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
                        content: 'Repeat ( nested without key ):',
                    },
                    {
                        tag: 'p',
                        content: html`
                            Repater without component with the same repeater
                            with component inside<br />
                            ( max value <strong>10</strong> ).
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
                className: 'list',
                content: repeat({
                    observe: () => proxi.data,
                    useSync: true,
                    render: ({ current }) => {
                        return fromObject({
                            tag: 'div',
                            content: [
                                {
                                    className: 'static-item-inner',
                                    content: bindObject`label: ${() => current.value.label}`,
                                },
                                {
                                    tag: 'div',
                                    content: repeat({
                                        observe: () => proxi.data,
                                        useSync: true,
                                        render: ({ sync, current }) => {
                                            return fromObject({
                                                tag: 'benchmark-fake-component',
                                                modules: [
                                                    bindProps(
                                                        /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
                                                        () => ({
                                                            index: current.index,
                                                            label: current.value
                                                                .label,
                                                            counter:
                                                                proxi.counter,
                                                        })
                                                    ),
                                                    sync(),
                                                ],
                                            });
                                        },
                                    }),
                                },
                            ],
                        });
                    },
                }),
            },
        ],
    });
};
