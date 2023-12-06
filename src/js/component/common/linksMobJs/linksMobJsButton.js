import { mobCore } from '../../../mobCore';
import { mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const linksMobJsButton = ({ html, getState, onMount }) => {
    const { label, url } = getState();

    onMount(({ element }) => {
        const { activeRoute } = mainStore.get();
        const isActiveRoute = activeRoute === url;

        mobCore.useFrame(() => {
            element.classList.toggle('current', isActiveRoute);
        });
    });

    return html`<a href="/#${url}">${label}</a>`;
};
