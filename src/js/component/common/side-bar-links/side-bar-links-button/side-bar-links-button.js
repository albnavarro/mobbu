import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {SideBarLinksButtonType} from "./type"
 */

/**
 * @type {MobComponent<SideBarLinksButtonType>}
 */
export const SideBarLinksButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'a',
        attributes: { href: `./#${proxi.url}` },
        modules: bindEffect({
            toggleClass: { current: () => proxi.active },
        }),
        content: proxi.label,
    });
};
