//@ts-check

/**
 * @import { MobComponent } from '../../../../mob/mobjs/type';
 * @import { FooterNavButton } from './type';
 **/

import { html } from '../../../../mob/mobjs';
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
