import { html } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './repeat-partial/second-level';

/**
 * @import {MobComponent, ReturnBindProps} from '@mobJsType'
 * @import {Matrioska} from './type'
 * @import {MatrioskaItem} from './item/type'
 */

/** @type {MobComponent<Matrioska>} */
export const MatrioskaRepeatFn = ({
    delegateEvents,
    updateState,
    repeat,
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
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="matrioska__body">
            <div class="matrioska__level matrioska__level--1">
                ${repeat({
                    observe: () => proxi.level1,
                    render: ({ current }) => {
                        return html`
                            <div
                                class="matrioska__item-wrap matrioska__item-wrap--1"
                            >
                                <matrioska-item
                                    class="matrioska-item--1"
                                    ${staticProps(
                                        /** @type {MatrioskaItem['props']} */ ({
                                            level: 'level 1',
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
                                >
                                    ${getSecondLevel({
                                        repeat,
                                        staticProps,
                                        bindProps,
                                        delegateEvents,
                                        proxi,
                                    })}
                                </matrioska-item>
                            </div>
                        `;
                    },
                })}
            </div>
        </div>
    </div>`;
};
