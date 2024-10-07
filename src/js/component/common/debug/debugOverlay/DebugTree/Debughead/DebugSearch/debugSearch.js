/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

import { getIdByInstanceName } from '../../../../../../../mobjs';

/** @type{MobComponent} */
export const DebugSearchFn = ({
    html,
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        return () => {};
    });

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
                            console.log(id);
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
                        console.log(id_input.value);
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
                            console.log(id);
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
                        console.log(id);
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
                            console.log('clear');
                        },
                    })}
                >
                    clear
                </button>
            </div>
        </div>
    </div>`;
};
