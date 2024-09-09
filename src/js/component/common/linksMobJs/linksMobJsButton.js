//@ts-check

import { mainStore } from '../../../mobjs';

/**
 * @type {import('../../../mobjs/type').MobComponent<import('./type').LinksMobJsButton>}
 */
export const LinksMobJsButtonFn = ({ html, getState }) => {
    const { label, url } = getState();
    const { activeRoute } = mainStore.get();
    const currentClass = activeRoute === url ? 'current' : '';

    return html`<a href="./#${url}" class="${currentClass}">${label}</a>`;
};
