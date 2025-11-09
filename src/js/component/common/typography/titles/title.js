import { html } from '@mobJs';

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
export const TitleFn = ({ getProxi }) => {
    const proxi = getProxi();

    const colorClass = proxi.color === 'inherit' ? '' : `is-${proxi.color}`;
    const boldClass = proxi.isBold ? `is-bold` : '';
    const isSectionClass = proxi.isSection ? `is-section` : '';

    return html`<${proxi.tag} class="${colorClass} ${boldClass} ${isSectionClass}">
            ${getIndex(proxi.index)}
            <span class="title-content">
                <mobjs-slot></mobjs-slot>
            </span>
        </${proxi.tag}>`;
};
