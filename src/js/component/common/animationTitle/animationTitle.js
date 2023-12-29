import { mobCore } from '../../../mobCore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const AnimationTitle = ({ getState, html, onMount }) => {
    const { title } = getState();

    onMount(({ refs }) => {
        const { titleEl } = refs;

        mobCore.useFrame(() => {
            titleEl.classList.add('visible');
        });
    });

    return html`<div class="c-animation-title">
        <h4 ref="titleEl">${title}</h4>
    </div>`;
};
