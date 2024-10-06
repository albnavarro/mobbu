//@ts-check

import { consoleLogDebug } from './consoleLog';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent} */
export const DebugButtonFn = ({ html, delegateEvents }) => {
    return html`
        <button
            type="button"
            class="c-btn-debug"
            ${delegateEvents({
                click: () => {
                    consoleLogDebug();
                },
            })}
        >
            Console Debug
        </button>
    `;
};
