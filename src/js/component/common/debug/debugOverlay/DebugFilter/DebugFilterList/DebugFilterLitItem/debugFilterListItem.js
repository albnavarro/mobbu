//@ts-check

/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

import { useMethodByName } from '../../../../../../../mobjs';

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    html,
    onMount,
    getState,
    watch,
    setRef,
    getRef,
    delegateEvents,
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
            <span class="c-debug-filter-list-item__id">${id}</span> |
            <span class="c-debug-filter-list-item__tag" ${setRef('tag')}
                >${tag}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${delegateEvents({
                    click: () => {
                        useMethodByName('debug_component')?.updateId(id);
                    },
                })}
            >
                [ > ]
            </button>
        </div>
    `;
};
