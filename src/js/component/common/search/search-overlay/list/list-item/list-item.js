import { htmlObject, MobJs } from '@mobJs';
import { closeSearchOverlay } from '../../utils';

/**
 * @param {object} params
 * @param {string} params.uri
 */
const loadPage = ({ uri }) => {
    MobJs.loadUrl({ url: uri });
    closeSearchOverlay();
};

/**
 * @import {MobComponent} from '@mobJsType'
 */

/** @type {MobComponent<import('./type').SearchOverlayListItemType>} */
export const SearchOverlayListItemFn = ({
    getSelfProxi,
    bindEffect,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getSelfProxi();

    return htmlObject({
        tag: 'li',
        modules: bindEffect({
            toggleClass: {
                current: () => proxi.active,
            },
        }),
        content: {
            tag: 'button',
            attributes: { type: 'button', role: 'link' },
            modules: [
                delegateEvents({
                    click: () => {
                        loadPage({ uri: proxi.uri });
                    },
                }),
                bindEffect({
                    toggleAttribute: {
                        'aria-current': () => (proxi.active ? 'page' : null),
                    },
                }),
            ],
            content: [
                {
                    className: 'item-section',
                    content: {
                        tag: 'p',
                        content: bindObject`<strong>${() => proxi.breadCrumbs}</strong> (${() => proxi.count})`,
                    },
                },
                {
                    tag: 'h6',
                    content: bindObject`${() => proxi.title}`,
                },
            ],
        },
    });
};
