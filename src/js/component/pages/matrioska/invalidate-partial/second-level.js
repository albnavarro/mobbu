import { html } from '@mobJs';
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
    return html`
        <div class="level level--2">
            ${invalidate({
                observe: () => proxi.level2,
                render: () => {
                    return proxi.level2
                        .map((item, index) => {
                            return html`
                                <div class="level-wrap level-wrap--2">
                                    <matrioska-item
                                        class="is-2"
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
