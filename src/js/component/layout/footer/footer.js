import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { html } from '@mobJs';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { toggleDebugOverlay } from '@commonComponent/debug/debug-overlay/utils';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').Footer>} */
export const FooterFn = ({ delegateEvents, getProxi, onMount, bindEffect }) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return html`
        <footer
            class="l-footer"
            ${bindEffect({
                toggleClass: {
                    'is-visible': () => proxi.isMounted,
                },
            })}
        >
            <div class="l-footer__container">
                <footer-nav></footer-nav>
                <div class="l-footer__debug">
                    <debug-button
                        class="c-button-debug"
                        ${delegateEvents({
                            click: () => {
                                toggleDebugOverlay();
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
