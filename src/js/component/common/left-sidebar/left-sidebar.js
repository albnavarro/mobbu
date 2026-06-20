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

/**
 * @param {object} params
 * @param {ProxiSelfState<LeftSidebar>} params.selfProxi
 * @param {ProxiBoundedState<LeftSidebar>} params.boundedProxi
 * @param {BindEffect<LeftSidebar>} params.bindEffect
 * @param {DelegateEvents} params.delegateEvents
 * @returns {HTMLElement[]}
 */
const getList = ({ selfProxi, boundedProxi, bindEffect, delegateEvents }) => {
    return selfProxi.data.map(({ name, hash }) => {
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
                            MobJs.loadUrl({ url: hash });
                        },
                    }),
                    bindEffect({
                        toggleClass: {
                            active: () => {
                                /**
                                 * Check id current button hash match to some routes path
                                 */
                                const paths = MobJs.getPagePath({
                                    hash: boundedProxi.activeRoute.route,
                                });

                                /**
                                 * Current route math with one of current path tree
                                 */
                                return paths.some(
                                    ({ hash: currentHash }) =>
                                        currentHash === hash
                                );
                            },
                        },
                        toggleAttribute: {
                            'aria-current': () => {
                                /**
                                 * Check id current button hash match to some routes path
                                 */
                                const paths = MobJs.getPagePath({
                                    hash: boundedProxi.activeRoute.route,
                                });

                                /**
                                 * Current route math with one of current path tree
                                 */
                                const isMatched = paths.some(
                                    ({ hash: currentHash }) =>
                                        currentHash === hash
                                );

                                /**
                                 * No matches with current route
                                 */
                                if (!isMatched) return null;

                                /**
                                 * Exact page
                                 */
                                if (boundedProxi.activeRoute.route === hash)
                                    return 'page';

                                /**
                                 * Is children page
                                 */
                                return 'true';
                            },
                        },
                    }),
                ],
                content: name,
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
