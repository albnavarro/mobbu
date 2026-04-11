import { fromObject } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './invalidate-partial/second-level';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {MatrioskaItem} from "./item/type"
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

    return fromObject({
        className: 'l-matrioska',
        content: [
            {
                className: 'header',
                content: [
                    getButtons({
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
                content: 'Nested repater like matrioska in same component.',
            },
            {
                className: 'level level--1',
                content: invalidate({
                    observe: 'level1',
                    render: () => {
                        return proxi.level1
                            .map((item, index) => {
                                return fromObject({
                                    className: 'level-wrap level-wrap--1',
                                    content: {
                                        tag: 'matrioska-item',
                                        className: 'is-1',
                                        modules: [
                                            staticProps(
                                                /** @type {Partial<MatrioskaItem['props']>} */ ({
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
                            })
                            .join('');
                    },
                }),
            },
        ],
    });
};
