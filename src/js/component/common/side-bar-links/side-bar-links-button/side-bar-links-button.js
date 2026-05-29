import { htmlObject } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {SideBarLinksButtonType} from "./type"
 */

/**
 * @type {MobComponent<SideBarLinksButtonType>}
 */
export const SideBarLinksButtonFn = ({ getSelfProxi, bindEffect }) => {
    const proxi = getSelfProxi();

    return htmlObject({
        tag: 'a',
        attributes: { href: `./#${proxi.url}` },
        modules: bindEffect({
            toggleClass: { current: () => proxi.active },
            toggleAttribute: {
                'aria-label': () =>
                    proxi.active ? `${proxi.label} current section` : null,
            },
        }),
        content: proxi.label,
    });
};
