import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { toggleMatrioskaItemActive } from '../item/utils';

/**
 * @import {DelegateEvents,  BindProps, StaticProps, Repeat, ReturnBindProps, ProxiState} from '@mobJsType'
 * @import {Matrioska} from '../type'
 * @import {MatrioskaItem} from '../item/type'
 */

/**
 * @param {object} params
 * @param {Repeat<Matrioska>} params.repeat
 * @param {StaticProps<MatrioskaItem>} params.staticProps
 * @param {BindProps<Matrioska, MatrioskaItem>} params.bindProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<Matrioska>} params.proxi
 */
export const getThirdLevel = ({
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
    proxi,
}) => {
    return html`
        <div class="matrioska__level matrioska__level--3">
            ${repeat({
                observe: () => proxi.level3,
                render: ({ current }) => {
                    const name = MobCore.getUnivoqueId();
                    const name2 = MobCore.getUnivoqueId();

                    /**
                     * With key bind props is unnecessary here
                     */
                    return html`
                        <div
                            class="matrioska__item-wrap matrioska__item-wrap--3"
                        >
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name}"
                                ${staticProps(
                                    /** @type {MatrioskaItem['props']} */ ({
                                        level: 'level 3',
                                    })
                                )}
                                ${bindProps(
                                    /** @returns {ReturnBindProps<MatrioskaItem>} */
                                    () => ({
                                        key: `${current.value.key}`,
                                        value: `${current.value.value}`,
                                        index: current.index,
                                        counter: proxi.counter,
                                    })
                                )}
                                ${delegateEvents({
                                    click: () => {
                                        toggleMatrioskaItemActive(name);
                                    },
                                })}
                            >
                            </matrioska-item>
                            <matrioska-item
                                class="matrioska-item--3"
                                name="${name2}"
                                ${staticProps(
                                    /** @type {MatrioskaItem['props']} */ ({
                                        level: 'level 3',
                                    })
                                )}
                                ${bindProps(
                                    /** @returns {ReturnBindProps<MatrioskaItem>} */
                                    () => {
                                        return {
                                            key: `${current.value.key}`,
                                            value: `${current.value.value}`,
                                            index: current.index,
                                            counter: proxi.counter,
                                        };
                                    }
                                )}
                                ${delegateEvents({
                                    click: () => {
                                        toggleMatrioskaItemActive(name2);
                                    },
                                })}
                            >
                            </matrioska-item>
                        </div>
                    `;
                },
            })}
        </div>
    `;
};
