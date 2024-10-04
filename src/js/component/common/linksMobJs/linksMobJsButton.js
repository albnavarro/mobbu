//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { LinksMobJsButton } from './type';
 **/

import { mainStore } from '../../../mobjs';

/**
 * @type {MobComponent<LinksMobJsButton>}
 */
export const LinksMobJsButtonFn = ({ html, getState }) => {
    const { label, url } = getState();
    const { activeRoute } = mainStore.get();
    const currentClass = activeRoute.route === url ? 'current' : '';

    return html`<a href="./#${url}" class="${currentClass}"
        ><span>${label}</span></a
    >`;
};
