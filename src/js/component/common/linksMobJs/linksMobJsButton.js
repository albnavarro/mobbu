import { mainStore } from '../../../mobjs';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const linksMobJsButton = ({ html, getState }) => {
    const { label, url } = getState();
    const { activeRoute } = mainStore.get();
    const currentClass = activeRoute === url ? 'current' : '';

    return html`<a href="/#${url}" class="${currentClass}">${label}</a>`;
};
