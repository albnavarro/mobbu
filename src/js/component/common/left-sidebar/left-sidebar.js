/**
 * @import {
 *   BindEffect,
 *   MobComponent
 * } from "@mobJsType"
 * @import {LeftSidebar} from "./type"
 */

import { html, MobJs } from '@mobJs';
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

            return html`
                <li class="item">
                    <a
                        href="${url}"
                        class="link"
                        ${bindEffect({
                            toggleClass: {
                                active: () =>
                                    proxi.activeRoute.route === urlParsed,
                            },
                        })}
                        >${label}</a
                    >
                </li>
            `;
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

    return html`<div
        class="left-sidebar"
        ${bindEffect({
            toggleClass: {
                visible: () => proxi.isVisible,
            },
        })}
    >
        <div class="title">Sections:</div>
        <ul class="list">
            ${invalidate({
                observe: () => proxi.data,
                render: () => {
                    return getList({ proxi, bindEffect });
                },
            })}
        </ul>
    </div>`;
};
