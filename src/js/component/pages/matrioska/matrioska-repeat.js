import { html } from '@mobJs';
import { getButtons } from './buttons-partial';
import { getSecondLevel } from './repeat-partial/second-level';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {MatrioskaItem} from "./item/type"
 * @import {Matrioska} from "./type"
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
            Nested repater like matrioska in same component.
            <span> First/Second/third level repeater without key. </span>
            <span> Third level use shuffle order. </span>
        </h4>
        <div class="level level--1">
            ${repeat({
                observe: () => proxi.level1,
                render: ({ current }) => {
                    return html`
                        <div class="level-wrap level-wrap--1">
                            <matrioska-item
                                class="is-1"
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
    </div>`;
};
