/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import {
    addHistoryRouteWithoutUpdate,
    addHistorySelectedNodes,
} from '../utils';

/**
 * Returns the first `limit` characters from the given `string`.
 *
 * @param {String} string
 * @param {Number} limit
 * @returns {String}
 */
function limit(string = '', limit = 30) {
    return string.length > limit
        ? `${string.slice(0, Math.max(0, limit))} ...`
        : string;
}

/** @type {MobComponent<import('./type').HistoryItem>} */
export const HistoryItemFn = ({
    getProxi,
    delegateEvents,
    bindEffect,
    watch,
}) => {
    const proxi = getProxi();

    watch(
        () => proxi.checked,
        (value) => {
            addHistorySelectedNodes({ id: proxi.id, add: value });
        }
    );

    /**
     * Update check value when parent force state.
     *
     * - Special case when side-effect is used to mutate internal state.
     */
    watch(
        () => proxi.forceSelect,
        (value) => (proxi.checked = value)
    );

    return html`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${proxi.id}"
                ${bindEffect({
                    toggleAttribute: {
                        checked: () => proxi.checked,
                    },
                })}
                ${delegateEvents({
                    click: (/** @type {MouseEvent} */ event) => {
                        proxi.checked = /** @type {HTMLInputElement} */ (
                            event.currentTarget
                        ).checked;
                    },
                })}
            />
            <span class="checkbox-control"></span>
        </div>
        <button
            type="button"
            class="c-history-item__button"
            ${delegateEvents({
                click: () => {
                    addHistoryRouteWithoutUpdate({ id: proxi.id });
                },
            })}
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                },
            })}
        >
            ${limit(proxi.url)}
        </button>
    </div>`;
};
