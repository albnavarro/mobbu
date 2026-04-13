//@ts-check

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

    const contentList = {
        className: 'list',
        content: invalidate({
            observe: () => proxi.data,
            render: () => {
                const { data } = getState();

                return data
                    .map(({ label }, index) => {
                        return htmlObject({
                            component: BenchMarkFakeComponent,
                            modules: [
                                staticProps(
                                    /** @type {import('../fake-component/type').BenchMarkFakeComponentType['props']} */
                                    ({
                                        label,
                                        index,
                                    })
                                ),
                                bindProps(
                                    /** @returns {ReturnBindProps<BenchMarkFakeComponentType>} */
                                    () => ({
                                        counter: proxi.counter,
                                    })
                                ),
                            ],
                        });
                    })
                    .join('');
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
            contentList,
        ],
    });
};
