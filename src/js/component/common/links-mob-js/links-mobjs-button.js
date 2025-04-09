//@ts-check

import { html } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {LinksMobJsButton} from './type';
 */

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
