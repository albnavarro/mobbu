/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { getIcons } from '@data/index';
import { toggleHistory } from '../utils';

/** @type {MobComponent} */
export const HistoryCtaFn = ({ delegateEvents }) => {
    const searchSvg = getIcons()['historyIcons'];

    return html`<button
        type="button"
        class="history-cta"
        ${delegateEvents({
            click: () => {
                toggleHistory();
            },
        })}
    >
        ${searchSvg}
    </button>`;
};
