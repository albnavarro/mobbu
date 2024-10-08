/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    html,
    onMount,
    getState,
    watch,
    setRef,
    getRef,
}) => {
    const { id, tag, name } = getState();

    onMount(() => {
        watch('tag', (value) => {
            const { tag } = getRef();
            tag.innerHTML = value;
        });

        return () => {};
    });

    return html`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${id}</span>
            <span class="c-debug-filter-list-item__tag" ${setRef('tag')}
                >${tag}</span
            >
            <span class="c-debug-filter-list-item__name">${name}</span>
        </div>
    `;
};
