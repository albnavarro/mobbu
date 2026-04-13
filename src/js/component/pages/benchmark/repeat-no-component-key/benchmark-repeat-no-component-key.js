import { htmlObject } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';
import { benchMarkVanillaGarbagePartial } from '../partials/bench-mark-vanilla-garbage-partial';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoComponentWithKeyFn = ({
    onMount,
    delegateEvents,
    setRef,
    getRef,
    repeat,
    bindEffect,
    bindObject,
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
        content: [
            repeat({
                observe: () => proxi.data,
                key: 'label',
                render: ({ current }) => {
                    return htmlObject({
                        className: 'c-benchmark-fake',
                        modules: [
                            bindEffect({
                                /**
                                 * Update only when buttonClick. Otherwise every data update selected state back to same
                                 * item.
                                 *
                                 * - Current trigger update on each data mutation.
                                 */
                                observe: [() => proxi.currentIndex],
                                toggleClass: {
                                    selected: () =>
                                        current.index === proxi.currentIndex,
                                },
                            }),
                        ],
                        content: [
                            {
                                className: 'row',
                                content: bindObject`<strong>index:</strong><br/> ${() => current.index}`,
                            },
                            {
                                className: 'row',
                                content: bindObject`<strong>label:</strong><br/> ${() => current.value.label}`,
                            },
                            {
                                className: 'row',
                                content: bindObject`<strong>counter: </strong><br/> ${() => proxi.counter}`,
                            },
                            {
                                className: 'row',
                                content: {
                                    tag: 'button',
                                    attributes: { type: 'button' },
                                    modules: delegateEvents({
                                        click: () => {
                                            proxi.currentIndex =
                                                proxi.currentIndex ===
                                                current.index
                                                    ? -1
                                                    : current.index;
                                        },
                                    }),
                                    content: 'Select',
                                },
                            },
                        ],
                    });
                },
            }),
        ],
    };

    return htmlObject({
        className: 'l-benchmark',
        content: [
            {
                className: 'header',
                content: [
                    {
                        tag: 'h3',
                        content: 'Repeat no component ( with key ):',
                    },
                    {
                        tag: 'h2',
                        content: 'Generate vanilla html performance',
                    },
                    benchMarkVanillaGarbagePartial(1000),
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
