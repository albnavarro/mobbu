//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { List } from './type';
 **/

import { html } from '../../../../mobjs';

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
    const { style, color, items, dots } = getState();

    const colorClass = `is-${color}`;
    const dotsClass = dots ? '' : `hide-dots`;

    return html`<ul class="ul ul--${style} ${colorClass} ${dotsClass}">
        ${getList({ items })}
    </ul>`;
};
