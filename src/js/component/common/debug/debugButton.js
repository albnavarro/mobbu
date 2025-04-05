//@ts-check

import { html } from '../../../mob/mobjs';

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';
 **/

/** @type {MobComponent} */
export const DebugButtonFn = () => {
    return html`
        <button type="button" class="c-btn-debug">
            <mobjs-slot></mobjs-slot>
        </button>
    `;
};
