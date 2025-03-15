//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { FooterNavButton } from './type';
 **/

import { html } from '../../../../mobjs';
import { navigationStore } from '../../navigation/store/navStore';

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
