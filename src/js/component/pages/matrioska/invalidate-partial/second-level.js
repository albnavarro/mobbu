import { fromObject } from '@mobJs';
import { getThirdLevel } from './third-level';
import { MatrioskaItem } from '../item/definition';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   Invalidate,
 *   ProxiState,
 *   StaticProps
 * } from "@mobJsType"
 * @import {MatrioskaItemType} from "../item/type"
 * @import {Matrioska} from "../type"
 */

/**
 * @param {object} params
 * @param {StaticProps<MatrioskaItemType>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItemType>} params.bindProps
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
        className: 'level level--2',
        content: invalidate({
            observe: () => proxi.level2,
            render: () => {
                return proxi.level2
                    .map((item, index) => {
                        return fromObject({
                            className: 'level-wrap level-wrap--2',
                            content: {
                                component: MatrioskaItem,
                                className: 'is-2',
                                modules: [
                                    staticProps(
                                        /** @type {MatrioskaItemType['props']} */ ({
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
                    })
                    .join('');
            },
        }),
    });
};
