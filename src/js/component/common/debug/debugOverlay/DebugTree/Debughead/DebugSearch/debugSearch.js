/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugSearch>} */
export const DebugSearchFn = ({ html, onMount }) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="c-debug-search">
        <div>
            <span class="c-debug-search__label">
                <strong>Search by ID:</strong>
            </span>
            <input class="c-debug-search__input" type="text" />
            <button class="c-debug-search__button" type="button">find</button>
        </div>
        <div>
            <span class="c-debug-search__label">
                <strong>Search by InstanceName:</strong>
            </span>
            <input class="c-debug-search__input" type="text" />
            <button class="c-debug-search__button" type="button">find</button>
        </div>
    </div>`;
};
