/**
 * @import {
 *   DelegateEvents,
 *   MobComponent
 * } from "@mobJsType"
 */

import { html, MobJs } from '@mobJs';

// @ts-ignore
import { getCommonData, getIcons } from '@data/index';
import { navigationStore } from '@stores/navigation';

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
 * @returns {string}
 */
function additems({ delegateEvents }) {
    /** @type {import('./type').HeaderUtils} */
    const header = getCommonData().header;
    const { links } = header;

    /** @type{Record<string, any>} */
    const icon = {
        github: getIcons()['gitHubIcon'],
    };

    return links
        .map((link) => {
            const { svg, url, internal } = link;

            return html`<li>
                ${internal
                    ? html`
                          <button
                              type="button"
                              data-url="${url}"
                              ${delegateEvents({
                                  click: (/** @type {Event} */ event) => {
                                      onClick({ event });
                                  },
                              })}
                          >
                              ${icon[svg]}
                          </button>
                      `
                    : html`
                          <a href="${url}" target="_blank"> ${icon[svg]} </a>
                      `}
            </li>`;
        })
        .join('');
}

/** @type {MobComponent} */
export const HeaderUtilsFn = ({ delegateEvents }) => {
    return html`
        <ul class="l-header-utils">
            <li>
                <search-cta></search-cta>
            </li>
            ${additems({ delegateEvents })}
        </ul>
    `;
};
