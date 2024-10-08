/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({ html, onMount, getState }) => {
    const { id } = getState();

    onMount(() => {
        return () => {};
    });

    return html` <div class="c-debug-filter-list-item">${id}</div> `;
};
