import { fromObject } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './repeat-partial/second-level';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {MatrioskaItem} from "./item/type"
 * @import {Matrioska} from "./type"
 */

/** @type {MobComponent<Matrioska>} */
export const MatrioskaRepeatFn = ({
    delegateEvents,
    updateState,
    repeat,
    staticProps,
    bindProps,
    invalidate,
    getProxi,
}) => {
    const proxi = getProxi();

    return fromObject({
        className: 'l-matrioska',
        content: [
            {
                className: 'header',
                content: [
                    ...getButtons({
                        delegateEvents,
                        updateState,
                        invalidate,
                        proxi,
                    }),
                    {
                        className: 'header-col',
                        content: {
                            tag: 'dynamic-list-button',
                            className: 'header-button',
                            modules: delegateEvents({
                                click: () => {
                                    updateState('counter', (val) => val + 1);
                                },
                            }),
                            content: 'Increment counter',
                        },
                    },
                ],
            },
            {
                tag: 'h4',
                className: 'legend',
                content: [
                    'Nested repater like matrioska in same component.',
                    {
                        tag: 'span',
                        content:
                            'First/Second/third level repeater without key.',
                    },
                    {
                        tag: 'span',
                        content: 'Third level use shuffle order.',
                    },
                ],
            },
            {
                className: 'level level--1',
                content: repeat({
                    observe: () => proxi.level1,
                    render: ({ current }) => {
                        return fromObject({
                            className: 'level-wrap level-wrap--1',
                            content: [
                                {
                                    tag: 'matrioska-item',
                                    className: 'is-1',
                                    modules: [
                                        staticProps(
                                            /** @type {MatrioskaItem['props']} */ ({
                                                level: 'level 1',
                                            })
                                        ),
                                        bindProps(
                                            /** @returns {ReturnBindProps<MatrioskaItem>} */
                                            () => ({
                                                key: `${current.value.key}`,
                                                value: `${current.value.value}`,
                                                index: current.index,
                                                counter: proxi.counter,
                                            })
                                        ),
                                    ],
                                    content: getSecondLevel({
                                        repeat,
                                        staticProps,
                                        bindProps,
                                        delegateEvents,
                                        proxi,
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
