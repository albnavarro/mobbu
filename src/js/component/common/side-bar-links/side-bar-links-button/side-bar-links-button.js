import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {SideBarLinksButtonType} from "./type"
 */

/**
 * @type {MobComponent<SideBarLinksButtonType>}
 */
export const SideBarLinksButtonFn = ({
    getSelfProxi,
    bindEffect,
    delegateEvents,
}) => {
    const proxi = getSelfProxi();

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button', role: 'link' },
        modules: [
            delegateEvents({
                click: () => {
                    MobJs.loadUrl({ url: proxi.url });
                },
            }),
            bindEffect({
                toggleClass: { current: () => proxi.active },
                toggleAttribute: {
                    'aria-current': () => (proxi.active ? 'page' : null),
                },
            }),
        ],
        content: proxi.label,
    });
};
