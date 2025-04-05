//@ts-check

import { html } from '@mobJs';

/**
 * @import { MobComponent } from '@mobJsType';
 **/

/** @type {MobComponent} */
export const DebugButtonFn = () => {
    return html`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;
};
