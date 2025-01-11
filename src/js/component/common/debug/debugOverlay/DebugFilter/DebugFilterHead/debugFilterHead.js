// @ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../../../../mobjs/type';
 **/

import { tick, useMethodByName } from '../../../../../../mobjs';

let lastSearch = '';

/** @type{MobComponent<import('./type').DebugFilterHead>} */
export const DebugFilterHeadFn = ({
    html,
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        (async () => {
            // Wait application render
            await tick();

            /** @type{UseMethodByName<import('../DebugFilterList/type').DebugFilterList>} */
            const methods = useMethodByName('debug_filter_list');
            methods?.refreshList({ testString: lastSearch });
        })();

        return () => {};
    });

    return html`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value="${lastSearch}"
            ${setRef('input')}
            ${delegateEvents({
                keypress: (/** @type{KeyboardEvent} */ event) => {
                    if (event.code.toLowerCase() === 'enter') {
                        event.preventDefault();

                        const testString = /** @type{HTMLInputElement} */ (
                            event.target
                        ).value;

                        lastSearch = testString;

                        /** @type{UseMethodByName<import('../DebugFilterList/type').DebugFilterList>} */
                        const methods = useMethodByName('debug_filter_list');
                        methods?.refreshList({ testString });
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
                    lastSearch = testString;

                    /** @type{UseMethodByName<import('../DebugFilterList/type').DebugFilterList>} */
                    const methods = useMethodByName('debug_filter_list');
                    methods?.refreshList({ testString });
                },
            })}
        >
            find
        </button>
    </div>`;
};
