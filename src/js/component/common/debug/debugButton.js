//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent} */
export const DebugButtonFn = ({ html }) => {
    return html`
        <button type="button" class="c-btn-debug">
            <mobjs_slot></mobjs_slot>
        </button>
    `;
};
