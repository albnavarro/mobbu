import { html, MobJs } from '@mobJs';
import { debugFilterListName } from 'src/js/component/instance-name';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

const refreshList = async (testString = '') => {
    await MobJs.tick();

    /** @type {UseMethodByName<import('../list/type').DebugFilterList>} */
    const methods = MobJs.useMethodByName(debugFilterListName);
    methods?.refreshList?.({ testString });
};

/** @type {MobComponent<import('./type').DebugFilterHead>} */
export const DebugFilterHeadFn = ({
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        /**
         * Update filter list on mount. No filter is applied here.
         */
        refreshList();
    });

    return html`<div class="c-debug-filter-head">
        <span class="c-debug-filter-head__title">Filter by tag</span>
        <input
            type="text"
            class="c-debug-filter-head__input"
            value=""
            ${setRef('input')}
            ${delegateEvents({
                keydown: (/** @type {KeyboardEvent} */ event) => {
                    if (event.code.toLowerCase() === 'enter') {
                        event.preventDefault();

                        const testString = /** @type {HTMLInputElement} */ (
                            event.target
                        ).value;
                        refreshList(testString);
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
                    refreshList(testString);
                },
            })}
        >
            find
        </button>
    </div>`;
};
