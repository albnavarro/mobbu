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
    console.log(proxi.data);
    return 'pippo';
};

/** @type {MobComponent<RightSidebar>} */
export const RightSidebarFn = ({ getProxi }) => {
    const proxi = getProxi();

    return html`<div class="right-sidebar">${getList({ proxi })}</div>`;
};
