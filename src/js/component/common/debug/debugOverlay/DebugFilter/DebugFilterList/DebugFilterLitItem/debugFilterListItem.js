//@ts-check

/**
 * @import { MobComponent, UseMethodByName } from '../../../../../../../mobjs/type';
 **/

import { html, MobJs } from '../../../../../../../mobjs';
import { debugActiveComponentStore } from '../../../Store/DebugActiveComponent';

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    delegateEvents,
    bindText,
    onMount,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { currentId } = debugActiveComponentStore.get();
        proxi.active = currentId === proxi.id;

        const unsubscribeActiveItem = debugActiveComponentStore.watch(
            'currentId',
            (value) => {
                proxi.active = value === proxi.id;
            }
        );

        return () => {
            unsubscribeActiveItem();
        };
    });

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
                        /** @type{UseMethodByName<import('../../../DebugComponent/type').DebugComponent>} */
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
