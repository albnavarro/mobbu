//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '@mobJsType';
 **/

import { debugActiveComponentStore } from '@commonComponent/debug/debug-overlay/store/debug-active-component';
import { html, MobJs } from '@mobJs';

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    delegateEvents,
    bindText,
    bindEffect,
    getProxi,
    bindStore,
    computed,
}) => {
    bindStore(debugActiveComponentStore);
    const proxi = getProxi();

    computed('active', () => proxi.id === proxi.currentId);

    return html`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${proxi.id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${bindText`${'tag'}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${proxi.name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${delegateEvents({
                    click: () => {
                        /** @type{UseMethodByName<import('../../../debug-component/type').DebugComponent>} */
                        const methods =
                            MobJs.useMethodByName('debug_component');
                        methods?.updateId(proxi.id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${bindEffect({
                    toggleClass: { active: () => proxi.active },
                })}
            ></span>
        </div>
    `;
};
