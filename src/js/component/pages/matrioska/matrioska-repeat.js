import { htmlObject } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './repeat-partial/second-level';
import { MatrioskaItem } from './item/definition';
import { DynamicListButton } from '@pagesComponent/dynamic-list/button/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {MatrioskaItemType} from "./item/type"
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

    const levelOneBlock = {
        className: 'level level--1',
        content: repeat({
            observe: () => proxi.level1,
            render: ({ current }) => {
                return htmlObject({
                    className: 'level-wrap level-wrap--1',
                    content: [
                        {
                            component: MatrioskaItem,
                            className: 'is-1',
                            modules: [
                                staticProps(
                                    /** @type {MatrioskaItemType['props']} */ ({
                                        level: 'level 1',
                                    })
                                ),
                                bindProps(
                                    /** @returns {ReturnBindProps<MatrioskaItemType>} */
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
    };

    return htmlObject({
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
                            component: DynamicListButton,
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
            levelOneBlock,
        ],
    });
};
