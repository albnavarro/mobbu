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
export const SearchOverlayListItemFunction = ({
    getSelfProxi,
    bindEffect,
    delegateEvents,
    bindObject,
    invalidate,
}) => {
    const proxi = getSelfProxi();

    const breadCrumbs = invalidate({
        observe: () => proxi.breadCrumbs,
        render: () => {
            return htmlObject({
                tag: 'ul',
                content: [
                    proxi.breadCrumbs.map((item, index) => {
                        const slash = index === 0 ? '' : '/';

                        return htmlObject({
                            tag: 'li',
                            className: 'path-item',
                            content: `${slash}${item.name}`,
                        });
                    }),
                    `<li class='counter'> (${proxi.count})</li>`,
                ],
            });
        },
    });

    return htmlObject({
        tag: 'li',
        className: 'search-list-item',
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
                        content: breadCrumbs,
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
