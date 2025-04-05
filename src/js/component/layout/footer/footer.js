//@ts-check

import { html, MobJs } from '../../../mob/mobjs';
import { consoleLogDebug } from '../../common/debug/consoleLog';

/**
 * @import {UseMethodByName} from '../../../mob/mobjs/type'
 * @import {DebugOverlay} from '../../common/debug/debugOverlay/type'
 */

/** @type {import("../../../mob/mobjs/type").MobComponent} */
export const FooterFn = ({ delegateEvents }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${delegateEvents({
                            click: () => {
                                /** @type{UseMethodByName<DebugOverlay>} */
                                const methods =
                                    MobJs.useMethodByName('debugOverlay');
                                methods?.toggle();
                            },
                        })}
                    >
                        Debug App</debug-button
                    >
                    <debug-button
                        class="c-button-console"
                        ${delegateEvents({
                            click: () => {
                                consoleLogDebug();
                            },
                        })}
                    >
                        Log
                    </debug-button>
                </div>
            </div>
        </footer>
    `;
};
