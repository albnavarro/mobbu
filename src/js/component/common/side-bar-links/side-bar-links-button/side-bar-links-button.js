import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from '@mobJsType'
 * @import {SidebarLinksButtonType} from './type'
 */

/**
 * @type {MobComponent<SidebarLinksButtonType>}
 */
export const SidebarLinksButtonFunction = ({
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
