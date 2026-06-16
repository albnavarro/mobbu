/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiBoundedState,
 *   ProxiSelfState
 * } from '@mobJsType'
 * @import {LeftSidebar} from './type'
 */

import { htmlObject, MobJs } from '@mobJs';
import { docsTemplate } from '@pages/index';

/** @type{(value: string) => string} */
const removeHashFromRoute = (value) => value.replaceAll('#', '');

/**
 * @param {object} params
 * @param {string} params.activeRoute
 * @param {{ baseRoute: string; currentRoute: string }[]} params.baseRoutes
 * @returns {{ baseRoute: string; currentRoute: string } | undefined}
 */
const getCurrentRouteData = ({ activeRoute, baseRoutes }) =>
    baseRoutes.find(({ currentRoute }) => activeRoute === currentRoute);

/**
 * @param {object} params
 * @param {ProxiSelfState<LeftSidebar>} params.selfProxi
 * @param {ProxiBoundedState<LeftSidebar>} params.boundedProxi
 * @param {BindEffect<LeftSidebar>} params.bindEffect
 * @param {DelegateEvents} params.delegateEvents
 * @returns {HTMLElement[]}
 */
const getList = ({ selfProxi, boundedProxi, bindEffect, delegateEvents }) => {
    return selfProxi.data.map(({ label, url }) => {
        const urlParsed = removeHashFromRoute(url);

        return htmlObject({
            className: 'item',
            tag: 'li',
            content: {
                tag: 'button',
                className: 'link',
                attributes: { type: 'button', role: 'link' },
                modules: [
                    delegateEvents({
                        click: () => {
                            MobJs.loadUrl({ url });
                        },
                    }),
                    bindEffect({
                        toggleClass: {
                            active: () => {
                                const currentItem = getCurrentRouteData({
                                    activeRoute: boundedProxi.activeRoute.route,
                                    baseRoutes: selfProxi.baseRoutes,
                                });

                                return currentItem?.baseRoute === urlParsed;
                            },
                        },
                        toggleAttribute: {
                            'aria-current': () => {
                                const currentItem = getCurrentRouteData({
                                    activeRoute: boundedProxi.activeRoute.route,
                                    baseRoutes: selfProxi.baseRoutes,
                                });

                                /**
                                 * Non é la pagina corrente
                                 */
                                if (currentItem?.baseRoute !== urlParsed)
                                    return null;

                                /**
                                 * E la pagina esatta.
                                 */
                                if (currentItem?.currentRoute === urlParsed)
                                    return 'page';

                                /**
                                 * E' un sottolivello
                                 */
                                return 'true';
                            },
                        },
                    }),
                ],
                content: label,
            },
        });
    });
};

/** @type {MobComponent<LeftSidebar>} */
export const LightSidebarFn = ({
    getSelfProxi,
    getBoundedProxi,
    invalidate,
    addMethod,
    computed,
    bindEffect,
    delegateEvents,
}) => {
    const selfProxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    addMethod('updateList', (data) => {
        selfProxi.data = data;
    });

    /**
     * Reset data if route is not a docs
     */
    MobJs.afterRouteChange(({ currentTemplate }) => {
        if (!docsTemplate.has(currentTemplate)) selfProxi.data = [];
    });

    /**
     * Hide when there is no data
     */
    computed(
        () => selfProxi.isVisible,
        () => selfProxi.data.length > 0
    );

    /**
     * Creiamo un array con l' associazione baseRoute ( parent ) e currentRoute.
     *
     * - Ci servirá per seleziona la voce attiva anche quando siamo in un sottolivello.
     * - Il primo livello avrá baseRoute e currentRoute uguali.
     */
    computed(
        () => selfProxi.baseRoutes,
        () => {
            return selfProxi.data.flatMap(({ url, children }) => {
                return [
                    {
                        baseRoute: removeHashFromRoute(url),
                        currentRoute: removeHashFromRoute(url),
                    },
                    ...children.map((child) => {
                        return {
                            baseRoute: removeHashFromRoute(url),
                            currentRoute: removeHashFromRoute(child),
                        };
                    }),
                ];
            });
        }
    );

    return htmlObject({
        tag: 'aside',
        className: 'left-sidebar',
        attributes: {
            'aria-label': 'Secondary navigation left',
        },
        modules: bindEffect({
            toggleClass: {
                visible: () => selfProxi.isVisible,
            },
            toggleAttribute: {
                hidden: () => !selfProxi.isVisible,
            },
        }),
        content: [
            {
                className: 'title',
                content: 'Realated pages:',
            },
            {
                tag: 'nav',
                attributes: {
                    'aria-label': 'Section navigation',
                },
                content: {
                    tag: 'ul',
                    className: 'list',
                    content: invalidate({
                        observe: () => selfProxi.data,
                        render: () => {
                            return getList({
                                selfProxi,
                                boundedProxi,
                                bindEffect,
                                delegateEvents,
                            });
                        },
                    }),
                },
            },
        ],
    });
};
