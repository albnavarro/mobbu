/**
 * @import {MobComponent} from '@mobJsType';
 * @import {RightSidebar} from './type';
 */

import { html, MobJs } from '@mobJs';

/**
 * @param {object} params
 * @param {RightSidebar['state']} params.proxi
 * @param {string} params.activeRoute
 */
const getList = ({ proxi, activeRoute }) => {
    return proxi.data
        .map(({ label, url }) => {
            const urlParsed = url.replaceAll('#', '');
            const activeClass = activeRoute === urlParsed ? 'active' : '';

            return html`
                <li class="right-sidebar__item">
                    <a href="${url}" class="right-sidebar__link ${activeClass}"
                        >${label}</a
                    >
                </li>
            `;
        })
        .join('');
};

/** @type {MobComponent<RightSidebar>} */
export const RightSidebarFn = ({ getProxi }) => {
    const proxi = getProxi();

    const { route: activeRoute } = MobJs.getActiveRoute();

    return html`<div class="right-sidebar">
        <div class="right-sidebar__title">related:</div>
        <ul class="right-sidebar__list">
            ${getList({ proxi, activeRoute })}
        </ul>
    </div>`;
};
