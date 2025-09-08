/**
 * @import {MobComponent} from '@mobJsType';
 * @import {RightSidebar} from './type';
 */

import { html } from '@mobJs';

/**
 * @param {object} params
 * @param {RightSidebar['state']} params.proxi
 */
const getList = ({ proxi }) => {
    return proxi.data
        .map((item) => {
            return html`
                <li class="right-sidebar__item">
                    <a href="${item.url}" class="right-sidebar__link"
                        >${item.label}</a
                    >
                </li>
            `;
        })
        .join('');
};

/** @type {MobComponent<RightSidebar>} */
export const RightSidebarFn = ({ getProxi }) => {
    const proxi = getProxi();

    return html`<div class="right-sidebar">
        <div class="right-sidebar__title">related:</div>
        <ul class="right-sidebar__list">
            ${getList({ proxi })}
        </ul>
    </div>`;
};
