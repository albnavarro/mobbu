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
export const ListFn = ({ getState }) => {
    const { style, color, items, dots, block } = getState();
    const useButton = !dots && !block;

    const colorClass = `is-${color}`;
    const blockClass = block ? 'use-block' : '';
    const buttonClass = useButton ? 'use-button' : '';

    return html`<ul
        class="ul ul--${style} ${colorClass} ${buttonClass} ${blockClass}"
    >
        ${getList({ items })}
    </ul>`;
};
