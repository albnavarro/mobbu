import { html } from '../../../../mobjs';

const getList = ({ items }) => {
    return items.map((item) => html` <li>${item}</li> `).join('');
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const ListFn = ({ html, getState }) => {
    const { style, color, items, dots } = getState();
    const colorClass = `is-${color}`;
    const dotsClass = dots ? '' : `hide-dots`;

    return html`<ul class="ul ul--${style} ${colorClass} ${dotsClass}">
        ${getList({ items })}
    </ul>`;
};
