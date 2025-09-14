import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { html, MobJs } from '@mobJs';
import { debugOverlayName } from '../../instance-name';
import { MobCore } from '@mobCore';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType'
 * @import {DebugOverlay} from '../../common/debug/debug-overlay/type'
 */

/** @type {MobComponent<import('./type').Footer>} */
export const FooterFn = ({ delegateEvents, getProxi, onMount, bindEffect }) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, 10);
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
                                /** @type {UseMethodByName<DebugOverlay>} */
                                const methods =
                                    MobJs.useMethodByName(debugOverlayName);
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
