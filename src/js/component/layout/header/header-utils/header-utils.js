/**
 * @import {
 *   DelegateEvents,
 *   MobComponent
 * } from "@mobJsType"
 */

import { htmlObject, MobJs } from '@mobJs';

// @ts-ignore
import { getCommonData, getIcons } from '@data/index';
import { navigationStore } from '@stores/navigation';
import { Search } from '@commonComponent/search/cta-search/definition';

/**
 * @param {object} params
 * @param {Event} params.event
 * @returns {void}
 */
const onClick = ({ event }) => {
    const button = event.target;
    console.log(button);
    const { url } = /** @type {HTMLButtonElement} */ (button)?.dataset ?? '';
    MobJs.loadUrl({ url });
    navigationStore.set('navigationIsOpen', false);
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @returns {string[]}
 */
function additems({ delegateEvents }) {
    /** @type {import('./type').HeaderUtils} */
    const header = getCommonData().header;
    const { links } = header;

    /** @type{Record<string, any>} */
    const icon = {
        github: getIcons()['gitHubIcon'],
    };

    return links.map((link) => {
        const { svg, url, internal } = link;

        return htmlObject({
            tag: 'li',
            content: internal
                ? htmlObject({
                      tag: 'button',
                      dataAttributes: { url },
                      modules: delegateEvents({
                          click: (/** @type {Event} */ event) => {
                              onClick({ event });
                          },
                      }),
                      content: icon[svg],
                  })
                : htmlObject({
                      tag: 'a',
                      attributes: { href: url, target: '_blank' },
                      content: icon[svg],
                  }),
        });
    });
}

/** @type {MobComponent} */
export const HeaderUtilsFn = ({ delegateEvents }) => {
    return htmlObject({
        tag: 'ul',
        className: 'l-header-utils',
        content: [
            {
                tag: 'li',
                content: {
                    component: Search,
                },
            },
            ...additems({ delegateEvents }),
        ],
    });
};
