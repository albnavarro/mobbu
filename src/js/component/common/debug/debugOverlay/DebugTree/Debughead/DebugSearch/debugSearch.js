/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugSearch>} */
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
            />
            <button
                class="c-debug-search__button"
                type="button"
                ${delegateEvents({
                    click: () => {
                        const { instance_input } = getRef();
                        console.log(instance_input.value);
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
