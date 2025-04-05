//@ts-check

import { html } from '../../../mob/mobjs';

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';]
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
