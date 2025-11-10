import { html } from '@mobJs';
import { getThirdLevel } from './third-level';

/**
 * @import {DelegateEvents,  BindProps, StaticProps, Invalidate, ProxiState} from '@mobJsType'
 * @import {Matrioska} from '../type'
 * @import {MatrioskaItem} from '../item/type'
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
    return html`
        <div class="matrioska__level matrioska__level--2">
            ${invalidate({
                observe: () => proxi.level2,
                render: () => {
                    return proxi.level2
                        .map((item, index) => {
                            return html`
                                <div
                                    class="matrioska__item-wrap matrioska__item-wrap--2"
                                >
                                    <matrioska-item
                                        class="matrioska-item--2"
                                        ${staticProps(
                                            /** @type {MatrioskaItem['props']} */ ({
                                                level: 'level 2',
                                                index: index,
                                                key: `${item.key}`,
                                                value: `${item.value}`,
                                            })
                                        )}
                                        ${bindProps(() => ({
                                            counter: proxi.counter,
                                        }))}
                                    >
                                        ${getThirdLevel({
                                            staticProps,
                                            delegateEvents,
                                            invalidate,
                                            bindProps,
                                            proxi,
                                        })}
                                    </matrioska-item>
                                </div>
                            `;
                        })
                        .join('');
                },
            })}
        </div>
    `;
};
