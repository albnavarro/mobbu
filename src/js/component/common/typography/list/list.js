//@ts-check

import { html } from '../../../../mobjs';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { List } from './type';
 **/

/**
 * @param {object} params
 * @param {string[]} params.items
 * @returns {string}
 */
const getList = ({ items }) => {
    return items.map((item) => html` <li>${item}</li> `).join('');
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
        ${getList({ items })}
    </ul>`;
};
