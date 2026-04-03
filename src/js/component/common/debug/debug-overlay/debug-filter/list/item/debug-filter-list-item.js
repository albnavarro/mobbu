/**
 * @import {MobComponent} from "@mobJsType"
 */

import { updateDebugComponentById } from '@commonComponent/debug/debug-overlay/debug-component/utils';
import { html } from '@mobJs';

/** @type {MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    delegateEvents,
    bindText,
    bindEffect,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();

    computed(
        () => proxi.active,
        () => proxi.id === proxi.currentId
    );

    return html`
        <div class="c-debug-filter-list-item">
            <span class="id">${proxi.id}</span> |
            <span class="tag">${bindText`${'tag'}`}</span> |
            <span class="name">${proxi.name}</span>
            <button
                type="button"
                class="expand"
                ${delegateEvents({
                    click: () => {
                        updateDebugComponentById(proxi.id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="selected"
                ${bindEffect({
                    toggleClass: { active: () => proxi.active },
                })}
            ></span>
        </div>
    `;
};
