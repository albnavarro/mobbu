import { html } from '../../../../mobjs';

const getList = ({ items }) => {
    return items.map((item) => html` <li>${item}</li> `).join('');
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const List = ({ html, getState }) => {
    const { style, color, items } = getState();
    const colorClass = `is-${color}`;

    return html`<ul class="ul ul--${style} ${colorClass}">
        ${getList({ items })}
    </ul>`;
};
