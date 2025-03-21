//@ts-check

import { html } from '../../../mobjs';

/**
 * @import { MobComponent } from '../../../mobjs/type';]
 * @import { LinksMobJsButton } from './type';
 **/

/**
 * @type {MobComponent<LinksMobJsButton>}
 */
export const LinksMobJsButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return html` <a
        href="./#${proxi.url}"
        ${bindEffect({
            toggleClass: { current: () => proxi.active },
        })}
        ><span>${proxi.label}</span></a
    >`;
};
