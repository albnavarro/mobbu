//@ts-check

import { getTrinangle } from '@componentLibs/utils/get-triangle';
import { html } from '@mobJs';

/**
 * @param {string} tag
 */
const shouldUseTrinagle = (tag) => {
    return tag === `h1` ? getTrinangle() : '';
};

/** @type {import('@mobJsType').MobComponent<import('./type').Title>} */
export const TitleFn = ({ getState }) => {
    const { tag, color, isBold, isSection } = getState();
    const colorClass = color === 'inherit' ? '' : `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';
    const isSectionClass = isSection ? `is-section` : '';

    return html`<${tag} class="mob-title ${colorClass} ${boldClass} ${isSectionClass}">
        <span class="triangle-left">${shouldUseTrinagle(tag)}</span>
        <span class="triangle-right">${shouldUseTrinagle(tag)}</span>
            <mobjs-slot></mobjs-slot>
        </${tag}>`;
};
