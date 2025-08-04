/**
 * @import {MobComponent} from '@mobJsType';
 * @import {FooterNavButton} from './type';
 */

import { html } from '@mobJs';

/** @type {MobComponent<FooterNavButton>} */
export const FooterNavButtonFn = ({ getProxi, bindEffect, computed }) => {
    const proxi = getProxi();

    computed(
        () => proxi.active,
        () => {
            return proxi.section === proxi.activeNavigationSection;
        }
    );

    return html`
        <button
            type="button"
            class="footer-nav__button"
            ${bindEffect({
                toggleClass: { current: () => proxi.active },
            })}
        >
            ${proxi.label}
        </button>
    `;
};
