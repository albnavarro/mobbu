import { html } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './invalidate-partial/second-level';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {MatrioskaItem} from "./item/type"
 * @import {Matrioska} from "./type"
 */

/** @type {MobComponent<Matrioska>} */
export const MatrioskaInvalidateFn = ({
    delegateEvents,
    updateState,
    staticProps,
    bindProps,
    invalidate,
    getProxi,
}) => {
    const proxi = getProxi();

    return html`<div class="l-matrioska">
        <div class="header">
            ${getButtons({
                delegateEvents,
                updateState,
                invalidate,
                proxi,
            })}
        </div>
        <h4 class="legend">
            Nested invalidate like matrioska in same component.
        </h4>
        <div class="level level--1">
            ${invalidate({
                observe: 'level1',
                render: () => {
                    return proxi.level1
                        .map((item, index) => {
                            return html`
                                <div class="level-wrap level-wrap--1">
                                    <matrioska-item
                                        class="is-1"
                                        ${staticProps(
                                            /** @type {Partial<MatrioskaItem['props']>} */ ({
                                                level: 'level 1',
                                                key: `${item.key}`,
                                                index: index,
                                                value: `${item.value}`,
                                            })
                                        )}
                                        ${bindProps(() => ({
                                            counter: proxi.counter,
                                        }))}
                                    >
                                        ${getSecondLevel({
                                            staticProps,
                                            bindProps,
                                            delegateEvents,
                                            invalidate,
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
    </div>`;
};
