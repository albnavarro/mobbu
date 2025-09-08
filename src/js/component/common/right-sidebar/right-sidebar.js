/**
 * @import {BindEffect, MobComponent} from '@mobJsType';
 * @import {RightSidebar} from './type';
 */

import { html, MobJs } from '@mobJs';
import {
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_DOCS_DEFAULT,
} from 'src/js/pages';

/**
 * @param {object} params
 * @param {RightSidebar['state']} params.proxi
 * @param {BindEffect<RightSidebar>} params.bindEffect
 * @returns {string}
 */
const getList = ({ proxi, bindEffect }) => {
    return proxi.data
        .map(({ label, url }) => {
            const urlParsed = url.replaceAll('#', '');

            return html`
                <li class="right-sidebar__item">
                    <a
                        href="${url}"
                        class="right-sidebar__link"
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

const docsTemplate = new Set([
    PAGE_TEMPLATE_COMPONENT_MOBJS,
    PAGE_TEMPLATE_DOCS_DEFAULT,
]);

/** @type {MobComponent<RightSidebar>} */
export const RightSidebarFn = ({
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
        class="right-sidebar"
        ${bindEffect({
            toggleClass: {
                visible: () => proxi.isVisible,
            },
        })}
    >
        <div class="right-sidebar__title">Sections:</div>
        <ul class="right-sidebar__list">
            ${invalidate({
                observe: () => proxi.data,
                render: () => {
                    return getList({ proxi, bindEffect });
                },
            })}
        </ul>
    </div>`;
};
