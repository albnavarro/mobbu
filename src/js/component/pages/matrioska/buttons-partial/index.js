import { html } from '@mobJs';
import { buttons } from './utils';
import { MobCore } from '@mobCore';

/**
 * @import {DelegateEvents, UpdateState,  Invalidate,  ProxiState} from '@mobJsType'
 * @import {Matrioska} from '../type'
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
    return html`
        ${buttons
            .map((button) => {
                return html` <div class="matrioska__head__item">
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
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
                        })}
                        >${button.label_minus}</dynamic-list-button
                    >
                    <dynamic-list-button
                        class="matrioska__button"
                        ${delegateEvents({
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
                        })}
                        >${button.label_plus}</dynamic-list-button
                    >
                    <div class="matrioska__head__counter">
                        ${invalidate({
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
                        })}
                    </div>
                </div>`;
            })
            .join('')}
        <div class="matrioska__head__cta-counter">
            <dynamic-list-button
                class="matrioska__button"
                ${delegateEvents({
                    click: () => {
                        updateState('counter', (val) => val + 1);
                    },
                })}
                >Increment counter</dynamic-list-button
            >
        </div>
    `;
};
