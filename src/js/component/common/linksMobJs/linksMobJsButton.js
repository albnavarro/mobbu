//@ts-check

import { html } from '../../../mobjs';

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { LinksMobJsButton } from './type';
 **/

/**
 * @type {MobComponent<LinksMobJsButton>}
 */
export const LinksMobJsButtonFn = ({ getState, bindEffect }) => {
    const { label, url } = getState();

    return html` <a
        href="./#${url}"
        ${bindEffect({
            bind: 'active',
            toggleClass: { current: () => getState().active },
        })}
        ><span>${label}</span></a
    >`;
};
