import { htmlObject } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './invalidate-partial/second-level';
import { MatrioskaItem } from './item/definition';
import { DynamicListButton } from '@pagesComponent/dynamic-list/button/definition';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {MatrioskaItemType} from "./item/type"
 * @import {Matrioska} from "./type"
 */

/** @type {MobComponent<Matrioska>} */
export const MatrioskaInvalidateFn = ({
    delegateEvents,
    updateState,
    staticProps,
    bindProps,
    invalidate,
    getProxi,
}) => {
    const proxi = getProxi();

    const levelOneBlock = {
        className: 'level level--1',
        content: invalidate({
            observe: 'level1',
            render: () => {
                return proxi.level1.map((item, index) => {
                    return htmlObject({
                        className: 'level-wrap level-wrap--1',
                        content: {
                            component: MatrioskaItem,
                            className: 'is-1',
                            modules: [
                                staticProps(
                                    /** @type {Partial<MatrioskaItemType['props']>} */ ({
                                        level: 'level 1',
                                        key: `${item.key}`,
                                        index: index,
                                        value: `${item.value}`,
                                    })
                                ),
                                bindProps(() => ({
                                    counter: proxi.counter,
                                })),
                            ],
                            content: getSecondLevel({
                                staticProps,
                                bindProps,
                                delegateEvents,
                                invalidate,
                                proxi,
                            }),
                        },
                    });
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
                content: 'Nested repater like matrioska in same component.',
            },
            levelOneBlock,
        ],
    });
};
