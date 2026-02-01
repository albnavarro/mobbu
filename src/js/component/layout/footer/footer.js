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
        <ul class="l-footer__bio">
            ${bioInfo
                .map((item) => {
                    return html` <li class="l-footer__bio__item">${item}</li> `;
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
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

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
                ${getBio()}
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
