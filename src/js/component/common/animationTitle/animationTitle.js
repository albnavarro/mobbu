import { mobCore } from '../../../mobCore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const AnimationTitle = ({ html, onMount, watchSync }) => {
    onMount(({ element, refs }) => {
        const { titleEl } = refs;

        watchSync('align', (value) => {
            element.classList.remove('is-left');
            element.classList.remove('is-right');
            element.classList.add(`is-${value}`);
        });

        watchSync('title', (value) => {
            titleEl.innerHTML = value;
        });

        watchSync('color', (value) => {
            titleEl.classList.remove('is-white');
            titleEl.classList.remove('is-black');
            titleEl.classList.remove('is-green');
            titleEl.classList.add(`is-${value}`);
        });

        mobCore.useFrame(() => {
            titleEl.classList.add('visible');
        });
    });

    return html`<div class="c-animation-title">
        <h4 ref="titleEl"></h4>
    </div>`;
};
