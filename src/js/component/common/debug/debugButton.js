//@ts-check

import { html } from '../../../mobjs';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent} */
export const DebugButtonFn = () => {
    return html`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;
};
