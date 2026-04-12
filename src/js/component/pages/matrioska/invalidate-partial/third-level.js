import { MobCore } from '@mobCore';
import { fromObject } from '@mobJs';
import { toggleMatrioskaItemActive } from '../item/utils';

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
 * @param {DelegateEvents} params.delegateEvents
 * @param {Invalidate<Matrioska>} params.invalidate
 * @param {ProxiState<Matrioska>} params.proxi
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 */
export const getThirdLevel = ({
    staticProps,
    delegateEvents,
    invalidate,
    bindProps,
    proxi,
}) => {
    return fromObject({
        className: 'level level--3',
        content: invalidate({
            observe: 'level3',
            render: () => {
                return proxi.level3
                    .map((item, index) => {
                        const name = MobCore.getUnivoqueId();
                        const name2 = MobCore.getUnivoqueId();

                        return fromObject({
                            className: 'level-wrap level-wrap--3',
                            content: [
                                {
                                    tag: 'matrioska-item',
                                    className: 'is-3',
                                    attributes: { name },
                                    modules: [
                                        staticProps(
                                            /** @type {MatrioskaItem['props']} */ ({
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
                                    tag: 'matrioska-item',
                                    className: 'is-3',
                                    attributes: { name: name2 },
                                    modules: [
                                        staticProps(
                                            /** @type {MatrioskaItem['props']} */ ({
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
                    })
                    .join('');
            },
        }),
    });
};
