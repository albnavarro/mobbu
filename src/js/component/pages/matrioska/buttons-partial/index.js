import { htmlObject } from '@mobJs';
import { buttons } from './utils';
import { MobCore } from '@mobCore';
import { DynamicListButton } from '@pagesComponent/dynamic-list/button/definition';

/**
 * @import {
 *   DelegateEvents,
 *   Invalidate,
 *   ProxiState,
 *   UpdateState
 * } from "@mobJsType"
 * @import {Matrioska} from "../type"
 */

/** @param {number} max */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {UpdateState<Matrioska>} params.updateState
 * @param {Invalidate<Matrioska>} params.invalidate
 * @param {ProxiState<Matrioska>} params.proxi
 */
export const getButtons = ({
    delegateEvents,
    updateState,
    invalidate,
    proxi,
}) => {
    return buttons.map((button) => {
        return htmlObject({
            className: 'header-col',
            content: [
                {
                    component: DynamicListButton,
                    className: 'header-button',
                    modules: delegateEvents({
                        click: async () => {
                            updateState(
                                /** @type {'level1' | 'level2' | 'level3'} */ (
                                    button.state
                                ),
                                (val) => {
                                    return val.slice(0, -1);
                                }
                            );
                        },
                    }),
                    content: button.label_minus,
                },
                {
                    component: DynamicListButton,
                    className: 'header-button',
                    modules: delegateEvents({
                        click: async () => {
                            updateState(
                                /** @type {'level1' | 'level2' | 'level3'} */ (
                                    button.state
                                ),
                                (val) => {
                                    return [
                                        ...val,
                                        {
                                            key: getRandomInt(1000),
                                            value: MobCore.getUnivoqueId(),
                                        },
                                    ];
                                }
                            );
                        },
                    }),
                    content: button.label_plus,
                },
                {
                    className: 'header-counter',
                    content: invalidate({
                        observe: /** @type {'level1' | 'level2' | 'level3'} */ (
                            button.state
                        ),
                        render: () => {
                            const data =
                                proxi?.[
                                    /** @type {'level1' | 'level2' | 'level3'} */ (
                                        button.state
                                    )
                                ];

                            return htmlObject({
                                content: ` Number of items: ${data.length} ( max
                                ${button.maxItem} )`,
                            });
                        },
                    }),
                },
            ],
        });
    });
};
