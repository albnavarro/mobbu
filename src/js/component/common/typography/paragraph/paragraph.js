//@ts-check

import { html } from '../../../../mobjs';

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").Paragraph>} */
export const ParagraphFn = ({ getState }) => {
    const { style, color, boxed } = getState();
    const colorClass = `is-${color}`;
    const boxedClass = boxed ? `boxed` : '';

    return html`<p class="p p--${style} p--${boxedClass} ${colorClass}">
        <mobjs-slot></mobjs-slot>
    </p>`;
};
