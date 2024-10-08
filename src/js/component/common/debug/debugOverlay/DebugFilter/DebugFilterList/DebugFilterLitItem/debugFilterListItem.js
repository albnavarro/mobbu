/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({ html, onMount, getState }) => {
    const { id, tag, name } = getState();

    onMount(() => {
        return () => {};
    });

    return html`
        <div class="c-debug-filter-list-item">
            <span>${id}</span>
            <span>${tag}</span>
            <span>${name}</span>
        </div>
    `;
};
