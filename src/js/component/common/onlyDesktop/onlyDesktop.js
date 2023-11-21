import { mobCore } from '../../../mobCore';
import { html } from '../../../mobjs';
import { core } from '../../../mobMotion';

const content = html`
    <div class="only-desktop">
        <h3>All the animation is aavailable only on desktop</h3>
        <h4>Need page relaod</h4>
    </div>
`;

const onResize = ({ element }) => {
    element.textContent = '';
    if (core.mq('min', 'desktop')) return;

    element.textContent = '';
    element.insertAdjacentHTML('afterbegin', content);
};

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const OnlyDesktop = ({ html, onMount }) => {
    onMount(({ element }) => {
        onResize({ element });

        mobCore.useResize(() => {
            onResize({ element });
        });
    });

    return html` <div class="only-desktop-container" ref="container"></div> `;
};
