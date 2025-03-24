// @ts-check

import { html, MobJs } from '../../../../../../mobjs';

/**
 * @import { MobComponent, UseMethodByName } from '../../../../../../mobjs/type';
 **/

let lastSearch = '';

const refreshList = async () => {
    await MobJs.tick();

    /** @type{UseMethodByName<import('../DebugFilterList/type').DebugFilterList>} */
    const methods = MobJs.useMethodByName('debug_filter_list');
    methods?.refreshList?.({ testString: lastSearch });
};

/** @type{MobComponent<import('./type').DebugFilterHead>} */
export const DebugFilterHeadFn = ({
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        refreshList();

        // Refresh list after route change
        const unsubscribeAfterRouteChange = MobJs.afterRouteChange(() => {
            refreshList();
        });

        return () => {
            unsubscribeAfterRouteChange();
            lastSearch = '';
        };
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
                        const methods =
                            MobJs.useMethodByName('debug_filter_list');
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
                    const methods = MobJs.useMethodByName('debug_filter_list');
                    methods?.refreshList({ testString });
                },
            })}
        >
            find
        </button>
    </div>`;
};
