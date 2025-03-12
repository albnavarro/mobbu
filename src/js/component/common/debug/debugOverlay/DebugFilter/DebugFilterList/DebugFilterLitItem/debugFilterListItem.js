//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../../../../../mobjs/type';
 **/

import { html, MobJs } from '../../../../../../../mobjs';
import { debugActiveComponentStore } from '../../../Store/DebugActiveComponent';

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    getState,
    setState,
    delegateEvents,
    bindText,
    onMount,
    bindEffect,
}) => {
    const { id, name } = getState();

    onMount(() => {
        const { currentId } = debugActiveComponentStore.get();
        setState('active', currentId === id);

        const unsubscribeActiveItem = debugActiveComponentStore.watch(
            'currentId',
            (value) => {
                setState('active', value === id);
            }
        );

        return () => {
            unsubscribeActiveItem();
        };
    });

    return html`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${bindText`${'tag'}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${delegateEvents({
                    click: () => {
                        /** @type{UseMethodByName<import('../../../DebugComponent/type').DebugComponent>} */
                        const methods =
                            MobJs.useMethodByName('debug_component');
                        methods?.updateId(id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${bindEffect({
                    bind: 'active',
                    toggleClass: { active: () => getState().active },
                })}
            ></span>
        </div>
    `;
};
