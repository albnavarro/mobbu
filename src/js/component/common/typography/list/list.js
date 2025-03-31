//@ts-check

import { html } from '../../../../mobjs';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { List } from './type';
 **/

/**
 * @param {object} params
 * @param {Record<'label'|'url', string>[]|string[]} params.items
 * @param {boolean} [ params.links ]
 * @returns {string}
 */
const getList = ({ items, links }) => {
    return links
        ? /** @type{Record<'label' | 'url', string>[]} */ (items)
              .map(
                  ({ label, url }) =>
                      html`<li>
                          <a href="${url}" class="list-links">
                              ${label}
                              <span class="list-links__arrow">
                                  <span class="list-links__arrow__start"></span>
                                  <span class="list-links__arrow__end"></span>
                              </span>
                          </a>
                      </li>`
              )
              .join('')
        : items.map((item) => html` <li>${item}</li> `).join('');
};

/** @type {MobComponent<List>} */
export const ListFn = ({ getState }) => {
    const { style, color, items, links } = getState();

    const colorClass = `is-${color}`;
    const linksClass = links ? 'use-links' : '';

    return html`<ul class="ul ul--${style} ${colorClass} ${linksClass}">
        ${getList({ items, links })}
    </ul>`;
};
