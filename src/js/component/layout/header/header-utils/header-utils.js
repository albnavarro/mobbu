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
import { SearchCta } from '@commonComponent/search/cta-search/definition';
import { searchOverlayCta } from '@instanceName';

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
 * @returns {HTMLElement[]}
 */
function additems({ delegateEvents }) {
    /** @type {import('./type').HeaderUtils} */
    const header = getCommonData().header;
    const { links } = header;

    /** @type{Record<string, any>} */
    const icons = {
        github: { icon: getIcons()['gitHubIcon'], ariaLabel: 'github' },
    };

    return links.map((link) => {
        const { svg, url, internal } = link;

        return htmlObject({
            tag: 'li',
            content: internal
                ? htmlObject({
                      tag: 'button',
                      dataAttributes: {
                          url,
                          'aria-label': icons[svg].ariaLabel,
                      },
                      modules: delegateEvents({
                          click: (/** @type {Event} */ event) => {
                              onClick({ event });
                          },
                      }),
                      content: icons[svg].icon,
                  })
                : htmlObject({
                      tag: 'a',
                      attributes: {
                          href: url,
                          target: '_blank',
                          'aria-label': icons[svg].ariaLabel,
                      },
                      content: icons[svg].icon,
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
                    component: SearchCta,
                    attributes: { name: searchOverlayCta },
                },
            },
            ...additems({ delegateEvents }),
        ],
    });
};
