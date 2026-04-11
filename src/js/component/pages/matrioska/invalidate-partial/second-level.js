import { fromObject } from '@mobJs';
import { getThirdLevel } from './third-level';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   Invalidate,
 *   ProxiState,
 *   StaticProps
 * } from "@mobJsType"
 * @import {MatrioskaItem} from "../item/type"
 * @import {Matrioska} from "../type"
 */

/**
 * @param {object} params
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<Matrioska>} params.proxi
 * @param {Invalidate<Matrioska>} params.invalidate
 */
export const getSecondLevel = ({
    staticProps,
    bindProps,
    delegateEvents,
    invalidate,
    proxi,
}) => {
    return fromObject({
        content: invalidate({
            observe: () => proxi.level2,
            render: () => {
                return fromObject({
                    className: 'level level--2',
                    content: proxi.level2.map((item, index) => {
                        return fromObject({
                            className: 'level-wrap level-wrap--2',
                            content: {
                                tag: 'matrioska-item',
                                className: 'is-2',
                                modules: [
                                    staticProps(
                                        /** @type {MatrioskaItem['props']} */ ({
                                            level: 'level 2',
                                            index: index,
                                            key: `${item.key}`,
                                            value: `${item.value}`,
                                        })
                                    ),
                                    bindProps(() => ({
                                        counter: proxi.counter,
                                    })),
                                ],
                                content: getThirdLevel({
                                    staticProps,
                                    delegateEvents,
                                    invalidate,
                                    bindProps,
                                    proxi,
                                }),
                            },
                        });
                    }),
                });
            },
        }),
    });
};
