/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { addHistoryRouteWithoutUpdate } from '../utils';

/** @type {MobComponent<import('./type').HistoryItem>} */
export const HistoryItemFn = ({ getProxi, delegateEvents, bindEffect }) => {
    const proxi = getProxi();

    return html`<div class="c-history-item">
        <div class="c-history-item__checkbox">
            <input
                type="checkbox"
                id="${proxi.id}"
                ${delegateEvents({
                    click: (/** @type {MouseEvent} */ event) => {
                        const target = event.target;
                        // @ts-ignore
                        const value = target?.checked;
                        console.log(value, proxi.id);
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
            ${proxi.url}
        </button>
    </div>`;
};
