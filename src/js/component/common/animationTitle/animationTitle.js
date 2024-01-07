import { mobCore } from '../../../mobCore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const AnimationTitle = ({ getState, html, onMount }) => {
    const { title, align, color } = getState();

    const alignClass = `is-${align}`;
    const colorClass = `is-${color}`;

    onMount(({ refs }) => {
        const { titleEl } = refs;

        mobCore.useFrame(() => {
            titleEl.classList.add('visible');
        });
    });

    return html`<div class="c-animation-title ${alignClass}">
        <h4 ref="titleEl" class="${colorClass}">${title}</h4>
    </div>`;
};
