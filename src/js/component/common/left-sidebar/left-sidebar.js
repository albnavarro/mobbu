/**
 * @import {
 *   BindEffect,
 *   MobComponent,
 *   ProxiBoundedState,
 *   ProxiSelfState
 * } from "@mobJsType"
 * @import {LeftSidebar} from "./type"
 */

import { htmlObject, MobJs } from '@mobJs';
import { docsTemplate } from '@pages/index';

/**
 * @param {object} params
 * @param {ProxiSelfState<LeftSidebar>} params.proxi
 * @param {ProxiBoundedState<LeftSidebar>} params.boundedProxi
 * @param {BindEffect<LeftSidebar>} params.bindEffect
 * @returns {HTMLElement[]}
 */
const getList = ({ proxi, boundedProxi, bindEffect }) => {
    return proxi.data.map(({ label, url }) => {
        const urlParsed = url.replaceAll('#', '');

        return htmlObject({
            className: 'item',
            tag: 'li',
            content: {
                tag: 'a',
                className: 'link',
                attributes: { href: url },
                modules: bindEffect({
                    toggleClass: {
                        active: () =>
                            boundedProxi.activeRoute.route === urlParsed,
                    },
                    toggleAttribute: {
                        'aria-label': () =>
                            boundedProxi.activeRoute.route === urlParsed
                                ? `${label} current section`
                                : null,
                    },
                }),
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
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    addMethod('updateList', (data) => {
        proxi.data = data;
    });

    /**
     * Reset data if route is not a docs
     */
    MobJs.afterRouteChange(({ currentTemplate }) => {
        if (!docsTemplate.has(currentTemplate)) proxi.data = [];
    });

    /**
     * Hide when there is no data
     */
    computed(
        () => proxi.isVisible,
        () => proxi.data.length > 0
    );

    return htmlObject({
        tag: 'aside',
        className: 'left-sidebar',
        attributes: {
            'aria-label': 'Secondary navigation left',
        },
        modules: bindEffect({
            toggleClass: {
                visible: () => proxi.isVisible,
            },
            toggleAttribute: {
                hidden: () => !proxi.isVisible,
            },
        }),
        content: [
            {
                className: 'title',
                content: 'Sections:',
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
                        observe: () => proxi.data,
                        render: () => {
                            return getList({ proxi, boundedProxi, bindEffect });
                        },
                    }),
                },
            },
        ],
    });
};
