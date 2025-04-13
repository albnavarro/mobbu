//@ts-check

import { html } from '@mobJs';

/** @type {import('@mobJsType').MobComponent<import('./type').Paragraph>} */
export const ParagraphFn = ({ getState }) => {
    const { style, color, boxed, note } = getState();
    const colorClass = color === 'inherit' ? '' : `is-${color}`;
    const boxedClass = boxed ? `p--boxed` : '';
    const noteClass = note ? `p--note` : '';

    return html`<p
        class="p p--${style} ${boxedClass} ${noteClass} ${colorClass}"
    >
        <mobjs-slot></mobjs-slot>
    </p>`;
};
