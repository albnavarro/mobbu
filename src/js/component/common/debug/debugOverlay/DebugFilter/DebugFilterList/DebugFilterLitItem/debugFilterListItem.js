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
            <span>${id}</span>
            <span ${setRef('tag')}>${tag}</span>
            <span>${name}</span>
        </div>
    `;
};
