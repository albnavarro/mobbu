import { htmlObject, MobJs } from '@mobJs';
import { toggleSearchOverlay } from '../../utils';

/**
 * @param {object} params
 * @param {string} params.uri
 */
const loadPage = ({ uri }) => {
    MobJs.loadUrl({ url: uri });
    toggleSearchOverlay();
};

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').SearchOverlayListItemType>} */
export const SearchOverlayListItemFn = ({
    getProxi,
    bindEffect,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'li',
        modules: bindEffect({
            toggleClass: {
                current: () => proxi.active,
            },
        }),
        content: {
            tag: 'button',
            modules: delegateEvents({
                click: () => {
                    loadPage({ uri: proxi.uri });
                },
            }),
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
