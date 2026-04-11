import { fromObject, html } from '@mobJs';
import { buttons } from './utils';
import { MobCore } from '@mobCore';

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
    return buttons
        .map((button) => {
            return fromObject({
                className: 'header-col',
                content: [
                    {
                        tag: 'dynamic-list-button',
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
                        tag: 'dynamic-list-button',
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
                            observe:
                                /** @type {'level1' | 'level2' | 'level3'} */ (
                                    button.state
                                ),
                            render: () => {
                                const data =
                                    proxi?.[
                                        /** @type {'level1' | 'level2' | 'level3'} */ (
                                            button.state
                                        )
                                    ];

                                return html`
                                    Number of items: ${data.length} ( max
                                    ${button.maxItem} )
                                `;
                            },
                        }),
                    },
                ],
            });
        })
        .join('');
};
