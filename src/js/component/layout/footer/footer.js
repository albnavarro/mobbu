//@ts-check

import { useMethodByName } from '../../../mobjs';
import { consoleLogDebug } from '../../common/debug/consoleLog';

/** @type {import("../../../mobjs/type").MobComponent} */
export const FooterFn = ({ html, delegateEvents }) => {
    return html`
        <footer class="l-footer">
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${delegateEvents({
                            click: () => {
                                useMethodByName('debugOverlay').toggle();
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
