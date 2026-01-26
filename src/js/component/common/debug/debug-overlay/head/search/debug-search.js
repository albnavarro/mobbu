/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html, MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../../constant';
import {
    refreshDebugComponentById,
    updateDebugComponentById,
} from '../../debug-component/utils';

/** @type {MobComponent<import('./type').DebugSearch>} */
export const DebugSearchFn = ({ setRef, getRef, delegateEvents }) => {
    return html`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${setRef('id_input')}
                ${delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const id = /** @type {HTMLInputElement} */ (
                                event.currentTarget
                            ).value;

                            updateDebugComponentById(id ?? '');
                        }
                    },
                })}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${delegateEvents({
                    click: () => {
                        const { id_input } = getRef();
                        const id = /** @type {HTMLInputElement} */ (id_input)
                            .value;

                        updateDebugComponentById(id ?? '');
                    },
                })}
            >
                find
            </button>
        </div>
        <div>
            <span class="c-debug-search__label">
                <strong>Search by InstanceName:</strong>
            </span>
            <input
                class="c-debug-search__input"
                type="text"
                ${setRef('instance_input')}
                ${delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const instanceName =
                                /** @type {HTMLInputElement} */ (
                                    event.currentTarget
                                ).value;

                            const id = MobJs.getIdByInstanceName(instanceName);
                            updateDebugComponentById(id ?? '');
                        }
                    },
                })}
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${delegateEvents({
                    click: () => {
                        const { instance_input } = getRef();
                        const instanceName = instance_input.value;
                        const id = MobJs.getIdByInstanceName(instanceName);
                        updateDebugComponentById(id ?? '');
                    },
                })}
            >
                find
            </button>
            <div>
                <span class="c-debug-search__label">
                    <strong>Clear:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            const { instance_input, id_input } = getRef();
                            instance_input.value = '';
                            id_input.value = '';
                            updateDebugComponentById(RESET_FILTER_DEBUG);
                        },
                    })}
                >
                    clear
                </button>
            </div>
            <div>
                <span class="c-debug-search__label">
                    <strong>Refresh:</strong>
                </span>
                <button
                    class="c-debug-search__button"
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            refreshDebugComponentById();
                        },
                    })}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;
};
