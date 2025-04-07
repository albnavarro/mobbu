//@ts-check

import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { html, MobJs } from '@mobJs';

/**
 * @import { MobComponent, UseMethodByName } from '@mobJsType'
 * @import { DebugOverlay } from '../../common/debug/debugOverlay/type'
 */

/** @type {MobComponent} */
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
