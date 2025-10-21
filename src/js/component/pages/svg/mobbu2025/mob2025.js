//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 */

import { html } from '@mobJs';

/** @type {MobComponent<import('./type').Mobbu2025>} */
export const Mobbu2025fn = ({ getState, onMount }) => {
    const { layer01, layer02, layer03, layer04 } = getState();

    onMount(() => {
        return () => {};
    });

    // 690 x 117

    /**
     * Desktop
     */
    return html`<div class="mobbu2025">
        <div class="mobbu2025__layer">${layer01}</div>
        <div class="mobbu2025__layer">${layer02}</div>
        <div class="mobbu2025__layer">${layer03}</div>
        <div class="mobbu2025__layer">${layer04}</div>
    </div>`;
};
