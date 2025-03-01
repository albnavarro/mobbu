//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { List } from './type';
 **/

import { html } from '../../../../mobjs';

/**
 * @param {number} index
 * @returns { string }
 */
const getCounter = (index) => (index < 10 ? `0${index}` : `${index}`);

/**
 * @param {object} params
 * @param {string[]} params.items
 * @param {boolean} params.useBlock
 * @returns {string}
 */
const getList = ({ items, useBlock }) => {
    return useBlock
        ? items
              .map(
                  (item, index) => html`
                      <li>
                          <span class="use-block-counter"
                              >${getCounter(index + 1)}</span
                          >
                          ${item}
                      </li>
                  `
              )
              .join('')
        : items.map((item) => html` <li>${item}</li> `).join('');
};

/** @type {MobComponent<List>} */
export const ListFn = ({ html, getState }) => {
    const { style, color, items, dots, block } = getState();

    const colorClass = `is-${color}`;
    const dotsClass = dots ? '' : 'hide-dots';
    const blockClass = block ? 'use-block' : '';

    return html`<ul
        class="ul ul--${style} ${colorClass} ${dotsClass} ${blockClass}"
    >
        ${getList({ items, useBlock: block })}
    </ul>`;
};
