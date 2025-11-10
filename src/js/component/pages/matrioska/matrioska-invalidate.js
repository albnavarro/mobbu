import { html } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './invalidate-partial/second-level';

/**
 * @import {MobComponent} from '@mobJsType'
 * @import {Matrioska} from './type'
 * @import {MatrioskaItem} from './item/type'
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

    return html`<div class="matrioska">
        <div class="matrioska__head">
            ${getButtons({
                delegateEvents,
                updateState,
                invalidate,
                proxi,
            })}
        </div>
        <h4 class="matrioska__head__title">
            Nested invalidate like matrioska in same component.
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${invalidate({
                    observe: 'level1',
                    render: () => {
                        return proxi.level1
                            .map((item, index) => {
                                return html`
                                    <div
                                        class="matrioska__item-wrap matrioska__item-wrap--1"
                                    >
                                        <matrioska-item
                                            class="matrioska-item--1"
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
        </div>
    </div>`;
};
