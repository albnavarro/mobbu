/**
 * @import { MobComponent, UseMethodByName } from '../../../../../../mobjs/type';
 **/

import { getIdByInstanceName, useMethodByName } from '../../../../../../mobjs';
import { RESET_FILTER_DEBUG } from '../../constant';

/** @type{MobComponent} */
export const DebugSearchFn = ({ html, setRef, getRef, delegateEvents }) => {
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
                    keypress: (event) => {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            const id = event.target.value;

                            /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                            const methods = useMethodByName('debug_component');
                            methods?.updateId(id ?? '');
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
                        const id = id_input.value;

                        /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                        const methods = useMethodByName('debug_component');
                        methods?.updateId(id ?? '');
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
                    keypress: (event) => {
                        if (event.keyCode === 13) {
                            event.preventDefault();

                            const instanceName = event.target.value;
                            const id = getIdByInstanceName(instanceName);

                            /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                            const methods = useMethodByName('debug_component');
                            methods?.updateId(id ?? '');
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
                        const id = getIdByInstanceName(instanceName);

                        /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                        const methods = useMethodByName('debug_component');
                        methods?.updateId(id ?? '');
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

                            /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                            const methods = useMethodByName('debug_component');
                            methods?.updateId(RESET_FILTER_DEBUG);
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
                            const methods = useMethodByName('debug_component');
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
