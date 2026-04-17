import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { htmlObject } from '@mobJs';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { toggleDebugOverlay } from '@commonComponent/debug/debug-overlay/utils';
import { DebugButton } from '@commonComponent/debug/definition';

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
 * @returns {HTMLElement}
 */
const getBio = () => {
    return htmlObject({
        tag: 'ul',
        className: 'bio-cell',
        content: bioInfo.map((item) => {
            return htmlObject({
                tag: 'li',
                className: 'bio-item',
                content: item,
            });
        }),
    });
};

/** @type {MobComponent<import('./type').Footer>} */
export const FooterFn = ({ delegateEvents, getProxi, onMount, bindEffect }) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return htmlObject({
        tag: 'footer',
        className: 'js-footer',
        modules: bindEffect({
            toggleClass: {
                'is-visible': () => proxi.isMounted,
            },
        }),
        content: {
            className: 'grid',
            content: [
                getBio(),
                {
                    className: 'debug-cell',
                    content: [
                        {
                            component: DebugButton,
                            attributes: { type: 'button' },
                            className: 'c-button-debug',
                            modules: delegateEvents({
                                click: () => {
                                    toggleDebugOverlay();
                                },
                            }),
                            content: 'Debug App',
                        },
                        {
                            component: DebugButton,
                            attributes: { type: 'button' },
                            className: 'c-button-console',
                            modules: delegateEvents({
                                click: () => {
                                    consoleLogDebug();
                                },
                            }),
                            content: 'Log',
                        },
                    ],
                },
            ],
        },
    });
};
