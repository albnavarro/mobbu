import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { toggleMatrioskaItemActive } from '../item/utils';
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
 * @param {DelegateEvents} params.delegateEvents
 * @param {Invalidate<Matrioska>} params.invalidate
 * @param {ProxiState<Matrioska>} params.proxi
 * @param {BindProps<Matrioska, MatrioskaItemType>} params.bindProps
 */
export const getThirdLevel = ({
    staticProps,
    delegateEvents,
    invalidate,
    bindProps,
    proxi,
}) => {
    return htmlObject({
        className: 'level level--3',
        content: invalidate({
            observe: 'level3',
            render: () => {
                return proxi.level3.map((item, index) => {
                    const name = MobCore.getUnivoqueId();
                    const name2 = MobCore.getUnivoqueId();

                    return htmlObject({
                        className: 'level-wrap level-wrap--3',
                        content: [
                            {
                                component: MatrioskaItem,
                                className: 'is-3',
                                attributes: { name },
                                modules: [
                                    staticProps(
                                        /** @type {MatrioskaItemType['props']} */ ({
                                            level: 'level 3',
                                            value: item.value,
                                            index: index,
                                            key: `${item.key}`,
                                        })
                                    ),
                                    bindProps(() => {
                                        return {
                                            counter: proxi.counter,
                                        };
                                    }),
                                    delegateEvents({
                                        click: () => {
                                            toggleMatrioskaItemActive(name);
                                        },
                                    }),
                                ],
                            },
                            {
                                component: MatrioskaItem,
                                className: 'is-3',
                                attributes: { name: name2 },
                                modules: [
                                    staticProps(
                                        /** @type {MatrioskaItemType['props']} */ ({
                                            level: 'level 3',
                                            value: item.value,
                                            index: index,
                                            key: `${item.key}`,
                                        })
                                    ),
                                    bindProps(() => {
                                        return {
                                            counter: proxi.counter,
                                        };
                                    }),
                                    delegateEvents({
                                        click: () => {
                                            toggleMatrioskaItemActive(name);
                                        },
                                    }),
                                ],
                            },
                        ],
                    });
                });
            },
        }),
    });
};
