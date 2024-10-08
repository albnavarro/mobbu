/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

/** @type{MobComponent<>} */
export const DebugFilterHeadFn = ({
    html,
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            ${setRef('input')}
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
            class="c-debug-filter-head__button"
            type="button"
            ${delegateEvents({
                click: () => {
                    const { input } = getRef();
                    const id = input.value;
                    console.log(id);
                },
            })}
        >
            find
        </button>
    </div>`;
};
