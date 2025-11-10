import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { toggleMatrioskaItemActive } from '../item/utils';

/**
 * @import {DelegateEvents,  BindProps, StaticProps, Invalidate, ProxiState, ReturnBindProps} from '@mobJsType'
 * @import {Matrioska} from '../type'
 * @import {MatrioskaItem} from '../item/type'
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
    return html` <div class="matrioska__level matrioska__level--3">
        ${invalidate({
            observe: 'level3',
            render: () => {
                return proxi.level3
                    .map((item, index) => {
                        const name = MobCore.getUnivoqueId();
                        const name2 = MobCore.getUnivoqueId();

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
                                            value: item.value,
                                            index: index,
                                            key: `${item.key}`,
                                        })
                                    )}
                                    ${bindProps(
                                        /** @returns {ReturnBindProps<MatrioskaItem>} */
                                        () => {
                                            return {
                                                counter: proxi.counter,
                                            };
                                        }
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
                                            index: index,
                                            value: item.value,
                                            key: `${item.key}`,
                                        })
                                    )}
                                    ${bindProps(
                                        /** @returns {ReturnBindProps<MatrioskaItem>} */
                                        () => {
                                            return {
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
                    })
                    .join('');
            },
        })}
    </div>`;
};
