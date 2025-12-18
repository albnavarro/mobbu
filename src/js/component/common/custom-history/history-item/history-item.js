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
    onMount,
    setRef,
    getRef,
    watch,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { checkbox } = getRef();

        watch(
            () => proxi.forceSelect,
            (value) => {
                checkbox.checked = value;
                addHistorySelectedNodes({ id: proxi.id, add: value });
            }
        );

        return () => {
            checkbox.remove();
        };
    });

    return html`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${proxi.id}"
                ${setRef('checkbox')}
                ${delegateEvents({
                    click: (/** @type {MouseEvent} */ event) => {
                        const target = event.target;
                        addHistorySelectedNodes({
                            id: proxi.id,
                            // @ts-ignore
                            add: target?.checked,
                        });
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
