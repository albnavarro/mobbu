//@ts-check

import { useMethodByName } from '../../../mobjs';
// import { consoleLogDebug } from './consoleLog';

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
                    useMethodByName('debugOverlay').toggle();
                },
            })}
        >
            Console Debug
        </button>
    `;
};

// consoleLogDebug();
