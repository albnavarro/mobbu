//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {FooterNavButton} from './type';
 */

import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
import { html } from '@mobJs';

/** @type {MobComponent<FooterNavButton>} */
export const FooterNavButtonFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    navigationStore.watch('activeNavigationSection', (current) => {
        proxi.active = current === proxi.section;
    });

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
