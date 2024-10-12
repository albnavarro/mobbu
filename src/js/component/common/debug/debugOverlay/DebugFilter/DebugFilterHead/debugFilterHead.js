// @ts-check

/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { tick, useMethodByName } from '../../../../../../mobjs';

let lastSearch = '';

/** @type{MobComponent} */
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

            useMethodByName('debug_filter_list')?.refreshList({
                testString: lastSearch,
            });
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
                keypress: (event) => {
                    // @ts-ignore
                    if (event.keyCode === 13) {
                        event.preventDefault();

                        // @ts-ignore
                        const testString = event.target.value;
                        lastSearch = testString;
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
                    // @ts-ignore
                    const testString = input.value;
                    lastSearch = testString;
                    useMethodByName('debug_filter_list')?.refreshList({
                        testString,
                    });
                },
            })}
        >
            find
        </button>
    </div>`;
};
