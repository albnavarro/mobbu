//@ts-check

import { getTrinangle } from '@componentLibs/utils/get-triangle';
import { html } from '@mobJs';

/**
 * @param {string} tag
 * @returns {string}
 */
const shouldUseTrinagle = (tag) => {
    return tag === `h1` ? getTrinangle() : '';
};

/**
 * @param {string} index
 * @returns {string}
 */
const getIndex = (index) => {
    return index.length > 0
        ? html`<span class="title-index">${index}</span>`
        : ``;
};

/** @type {import('@mobJsType').MobComponent<import('./type').Title>} */
export const TitleFn = ({ getState }) => {
    const { tag, color, isBold, isSection, index, useSticky } = getState();
    const colorClass = color === 'inherit' ? '' : `is-${color}`;
    const boldClass = isBold ? `is-bold` : '';
    const isSectionClass = isSection ? `is-section` : '';
    const useStickyClass = useSticky ? `use-sticky` : '';

    return html`<${tag} class="${colorClass} ${boldClass} ${isSectionClass} ${useStickyClass}">
        ${getIndex(index)}
        <span class="triangle-left">${shouldUseTrinagle(tag)}</span>
        <span class="triangle-right">${shouldUseTrinagle(tag)}</span>
        <span class="title-content">
            <mobjs-slot></mobjs-slot>
        </span>
        </${tag}>`;
};
