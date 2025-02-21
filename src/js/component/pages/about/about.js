/**
 * @import { MobComponent } from '../../../mobjs/type';
 **/

/** @type {MobComponent<any>} */
export const AboutComponentFn = ({ html, getState }) => {
    const { title } = getState();

    return html`<div class="l-about">${title}</div>`;
};
