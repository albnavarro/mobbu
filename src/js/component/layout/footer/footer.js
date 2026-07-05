import { consoleLogDebug } from '@commonComponent/debug/console-log';
import { htmlObject } from '@mobJs';
import { MobCore } from '@mobCore';
import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { QuickNav } from '@commonComponent/quick-nav/definition';
import { quickNavName } from '@instanceName';

/**
 * @import {MobComponent} from '@mobJsType'
 */

const bioInfo = [
    'Alberto Navarro',
    'Milan, Italy',
    '<a class="u-is-desk" href="https://github.com/albnavarro/" target="_blank">[ github ]</a>',
    '<a class="u-is-desk" href="https://www.linkedin.com/in/alberto-navarro74/" target="_blank">[ linkedin ]</a>',
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
export const FooterFunction = ({
    delegateEvents,
    getSelfProxi,
    onMount,
    bindEffect,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    return htmlObject({
        tag: 'footer',
        className: 'js-footer',
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
                            instanceName: quickNavName,
                        },
                        {
                            tag: 'button',
                            className: 'log',
                            attributes: { type: 'button' },
                            modules: delegateEvents({
                                click: () => {
                                    consoleLogDebug();
                                },
                            }),
                            content: '[ log ]',
                        },
                    ],
                },
            ],
        },
    });
};
