import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { toggleMatrioskaItemActive } from '../item/utils';
import { MatrioskaItem } from '../item/definition';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   ProxiSelfState,
 *   Repeat,
 *   StaticProps
 * } from '@mobJsType'
 * @import {MatrioskaItemType} from '../item/type'
 * @import {Matrioska} from '../type'
 */

/**
 * @param {object} params
 * @param {Repeat<Matrioska>} params.repeat
 * @param {StaticProps<MatrioskaItemType>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItemType>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiSelfState<Matrioska>} params.proxi
 */
export const getThirdLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return htmlObject({
        className: 'level level--3',
        content: repeat({
            observe: () => proxi.level3,
            render: ({ current }) => {
                const name = MobCore.getUnivoqueId();
                const name2 = MobCore.getUnivoqueId();

                /**
                 * With key bind props is unnecessary here
                 */

                return htmlObject({
                    className: 'level-wrap level-wrap--3',
                    content: [
                        {
                            component: MatrioskaItem,
                            className: 'is-3',
                            instanceName: name,
                            modules: [
                                staticProps(
                                    /** @type {MatrioskaItemType['props']} */ ({
                                        level: 'level 3',
                                    })
                                ),
                                bindProps(() => ({
                                    key: String(current.value.key),
                                    value: String(current.value.value),
                                    index: current.index,
                                    counter: proxi.counter,
                                })),
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
                            instanceName: name2,
                            modules: [
                                staticProps(
                                    /** @type {MatrioskaItemType['props']} */ ({
                                        level: 'level 3',
                                    })
                                ),
                                bindProps(() => ({
                                    key: String(current.value.key),
                                    value: String(current.value.value),
                                    index: current.index,
                                    counter: proxi.counter,
                                })),
                                delegateEvents({
                                    click: () => {
                                        toggleMatrioskaItemActive(name2);
                                    },
                                }),
                            ],
                        },
                    ],
                });
            },
        }),
    });
};
