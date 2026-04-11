import { fromObject } from '@mobJs';
import { getThirdLevel } from './third-level';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   ProxiState,
 *   Repeat,
 *   StaticProps
 * } from "@mobJsType"
 * @import {MatrioskaItem} from "../item/type"
 * @import {Matrioska} from "../type"
 */

/**
 * @param {object} params
 * @param {Repeat<Matrioska>} params.repeat
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<Matrioska>} params.proxi
 */
export const getSecondLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return fromObject({
        className: 'level level--2',
        content: repeat({
            observe: () => proxi.level2,
            render: ({ current }) => {
                return fromObject({
                    className: 'level-wrap level-wrap--2',
                    content: {
                        tag: 'matrioska-item',
                        className: 'is-2',
                        modules: [
                            staticProps(
                                /** @type {MatrioskaItem['props']} */ ({
                                    level: 'level 2',
                                })
                            ),
                            bindProps(() => ({
                                key: `${current.value.key}`,
                                value: `${current.value.value}`,
                                index: current.index,
                                counter: proxi.counter,
                            })),
                        ],
                        content: getThirdLevel({
                            repeat,
                            staticProps,
                            delegateEvents,
                            bindProps,
                            proxi,
                        }),
                    },
                });
            },
        }),
    });
};
