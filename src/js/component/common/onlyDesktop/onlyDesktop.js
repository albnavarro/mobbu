//@ts-check

import { mobCore } from '../../../mobCore';
import { html } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';

const content = html`
    <div class="only-desktop">
        <h3>This content is available only on desktop</h3>
        <h4>Need page reload on a screen size up to 1024px</h4>
    </div>
`;

const onResize = ({ element }) => {
    element.textContent = '';
    if (motionCore.mq('min', 'desktop')) return;

    element.textContent = '';
    element.insertAdjacentHTML('afterbegin', content);
};

/**
 * @type {import("../../../mobjs/type").mobComponent}
 */
export const OnlyDesktopFn = ({ html, onMount }) => {
    onMount(({ element }) => {
        onResize({ element });

        mobCore.useResize(() => {
            onResize({ element });
        });

        return () => {};
    });

    return html` <div class="only-desktop-container" ref="container"></div> `;
};
