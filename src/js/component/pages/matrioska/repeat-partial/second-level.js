import { htmlObject } from '@mobJs';
import { getThirdLevel } from './third-level';
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
export const getSecondLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return htmlObject({
        className: 'level level--2',
        content: repeat({
            observe: () => proxi.level2,
            render: ({ current }) => {
                return htmlObject({
                    className: 'level-wrap level-wrap--2',
                    content: {
                        component: MatrioskaItem,
                        className: 'is-2',
                        modules: [
                            staticProps(
                                /** @type {MatrioskaItemType['props']} */ ({
                                    level: 'level 2',
                                })
                            ),
                            bindProps(() => ({
                                key: String(current.value.key),
                                value: String(current.value.value),
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
