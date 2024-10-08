/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { useMethodByName } from '../../../../../../mobjs';

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

                        const testString = event.target.value;
                        useMethodByName('debug_filter_list')?.refreshList({
                            testString,
                        });
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
                    const testString = input.value;
                    useMethodByName('debug-filter-list')?.refreshList({
                        testString,
                    });
                },
            })}
        >
            find
        </button>
    </div>`;
};
