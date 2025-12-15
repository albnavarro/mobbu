/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { addHistoryRouteWithoutUpdate } from '../utils';

/** @type {MobComponent<import('./type').HistoryItem>} */
export const HistoryItemFn = ({ getProxi, delegateEvents, bindEffect }) => {
    const proxi = getProxi();

    return html`<button
        type="button"
        class="c-history-item"
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
    </button>`;
};
