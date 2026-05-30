import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { htmlObject } from '@mobJs';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { openDebugOverlay } from '@commonComponent/debug/debug-overlay/utils';
import { DebugButton } from '@commonComponent/debug/definition';
import { QuickNav } from '@commonComponent/quick-nav/definition';
import { debugCtaName, quickNavName } from '@instanceName';

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
export const FooterFn = ({
    delegateEvents,
    getSelfProxi,
    onMount,
    bindEffect,
    staticProps,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return htmlObject({
        tag: 'aside',
        className: ['js-footer', 'l-bottom-bar'],
        attributes: { 'aria-label': 'Bottom complementary utils' },
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
                            component: QuickNav,
                            attributes: { name: quickNavName },
                        },
                        {
                            component: DebugButton,
                            attributes: {
                                name: debugCtaName,
                            },
                            className: 'c-button-debug',
                            modules: [
                                delegateEvents({
                                    click: () => {
                                        openDebugOverlay();
                                    },
                                }),
                                staticProps(
                                    /** @type {import('@commonComponent/debug/type').DebugOverlayCta['props']} */
                                    ({
                                        ariaControls: 'debug-dialog',
                                    })
                                ),
                            ],
                            content: 'Debug App',
                        },
                        {
                            component: DebugButton,
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
