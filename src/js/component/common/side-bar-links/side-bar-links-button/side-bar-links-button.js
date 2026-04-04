import { html } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {SideBarLinksButton} from "./type"
 */

/**
 * @type {MobComponent<SideBarLinksButton>}
 */
export const SideBarLinksButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return html` <a
        href="./#${proxi.url}"
        ${bindEffect({
            toggleClass: { current: () => proxi.active },
        })}
        ><span>${proxi.label}</span></a
    >`;
};
