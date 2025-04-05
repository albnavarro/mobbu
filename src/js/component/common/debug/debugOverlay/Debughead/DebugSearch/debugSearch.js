// @ts-check

/**
 * @import { MobComponent, UseMethodByName } from '@mobJsType';
 **/

import { html, MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../../constant';

const updateId = (id = '') => {
    /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
    const methods = MobJs.useMethodByName('debug_component');
    methods?.updateId(id ?? '');
};

/** @type{MobComponent<import('./type').DebugSearch>} */
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
                    keypress: (/** @type{KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const id = /** @type{HTMLInputElement} */ (
                                event.target
                            ).value;

                            updateId(id);
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
                        const id = /** @type{HTMLInputElement} */ (id_input)
                            .value;

                        updateId(id);
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
                    keypress: (/** @type{KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const instanceName =
                                /** @type{HTMLInputElement} */ (event.target)
                                    .value;

                            const id = MobJs.getIdByInstanceName(instanceName);
                            updateId(id);
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
                        updateId(id);
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
                            updateId(RESET_FILTER_DEBUG);
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
                            /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                            const methods =
                                MobJs.useMethodByName('debug_component');
                            methods?.refreshId();
                        },
                    })}
                >
                    refresh component
                </button>
            </div>
        </div>
    </div>`;
};
