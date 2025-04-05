//@ts-check

import { html } from '../../../../mob/mobjs';

/** @type {import("../../../../mob/mobjs/type").MobComponent<import("./type").Paragraph>} */
export const ParagraphFn = ({ getState }) => {
    const { style, color, boxed, note } = getState();
    const colorClass = `is-${color}`;
    const boxedClass = boxed ? `boxed` : '';
    const noteClass = note ? `note` : '';

    return html`<p
        class="p p--${style} p--${boxedClass} p--${noteClass} ${colorClass}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`;
};
