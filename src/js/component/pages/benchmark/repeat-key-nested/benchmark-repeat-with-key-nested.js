import { htmlObject, html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';
import { BenchMarkFakeComponent } from '../fake-component/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {BenchMarkFakeComponentType} from "../fake-component/type"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithKyFnNested = ({
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

    const contentList = {
        className: 'list',
        content: repeat({
            observe: () => proxi.data,
            key: 'label',
            render: ({ current }) => {
                return htmlObject({
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
                                key: 'label',
                                render: ({ current }) => {
                                    return htmlObject({
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
                                    });
                                },
                            }),
                        },
                    ],
                });
            },
        }),
    };

    return htmlObject({
        className: 'l-benchmark',
        content: [
            {
                className: 'header',
                content: [
                    {
                        tag: 'h3',
                        content: 'Repeat ( nested with key ):',
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
            contentList,
        ],
    });
};
