//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').Paragraph>} */
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
