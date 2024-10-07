/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

import {
    getIdByInstanceName,
    useMethodByName,
} from '../../../../../../../mobjs';
import { RESET_FILTER_DEBUG } from '../../../constant';

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
                            useMethodByName('debug_component')?.updateId(
                                id ?? ''
                            );
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

                        useMethodByName('debug_component')?.updateId(id ?? '');
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
                            useMethodByName('debug_component')?.updateId(
                                id ?? ''
                            );
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
                        useMethodByName('debug_component')?.updateId(id ?? '');
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
                            useMethodByName('debug_component')?.updateId(
                                RESET_FILTER_DEBUG
                            );
                        },
                    })}
                >
                    clear
                </button>
            </div>
        </div>
    </div>`;
};
