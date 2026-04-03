import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { html } from '@mobJs';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { toggleDebugOverlay } from '@commonComponent/debug/debug-overlay/utils';

/**
 * @import {MobComponent} from "@mobJsType"
 */

const bioInfo = [
    'Alberto Navarro',
    'Milan, Italy',
    '<a href="https://github.com/albnavarro/" target="_blank">[ github ]</a>',
    '<a href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>',
];

/**
 * @returns {string}
 */
const getBio = () => {
    return html`
        <ul class="bio-cell">
            ${bioInfo
                .map((item) => {
                    return html` <li class="bio-item">${item}</li> `;
                })
                .join('')}
        </ul>
    `;
};

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
            class="js-footer"
            ${bindEffect({
                toggleClass: {
                    'is-visible': () => proxi.isMounted,
                },
            })}
        >
            <div class="grid">
                ${getBio()}
                <div class="debug-cell">
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
