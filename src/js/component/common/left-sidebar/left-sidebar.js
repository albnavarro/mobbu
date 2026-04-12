/**
 * @import {
 *   BindEffect,
 *   MobComponent
 * } from "@mobJsType"
 * @import {LeftSidebar} from "./type"
 */

import { fromObject, MobJs } from '@mobJs';
import { docsTemplate } from '@pages/index';

/**
 * @param {object} params
 * @param {LeftSidebar['state']} params.proxi
 * @param {BindEffect<LeftSidebar>} params.bindEffect
 * @returns {string}
 */
const getList = ({ proxi, bindEffect }) => {
    return proxi.data
        .map(({ label, url }) => {
            const urlParsed = url.replaceAll('#', '');

            return fromObject({
                className: 'item',
                tag: 'li',
                content: {
                    tag: 'a',
                    className: 'link',
                    attributes: { href: url },
                    modules: bindEffect({
                        toggleClass: {
                            active: () => proxi.activeRoute.route === urlParsed,
                        },
                    }),
                    content: label,
                },
            });
        })
        .join('');
};

/** @type {MobComponent<LeftSidebar>} */
export const LightSidebarFn = ({
    getProxi,
    invalidate,
    addMethod,
    computed,
    bindEffect,
}) => {
    const proxi = getProxi();

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

    return fromObject({
        className: 'left-sidebar',
        modules: bindEffect({
            toggleClass: {
                visible: () => proxi.isVisible,
            },
        }),
        content: [
            {
                className: 'title',
                content: 'Sections:',
            },
            {
                tag: 'ul',
                className: 'list',
                content: invalidate({
                    observe: () => proxi.data,
                    render: () => {
                        return getList({ proxi, bindEffect });
                    },
                }),
            },
        ],
    });
};
