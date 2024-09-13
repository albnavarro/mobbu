//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { FooterNavButton } from './type';
 **/

import { navigationStore } from '../../navigation/store/navStore';

/** @type {MobComponent<FooterNavButton>} */
export const FooterNavButtonFn = ({ html, onMount, getState }) => {
    const { label, section } = getState();

    onMount(({ element }) => {
        navigationStore.watch('activeNavigationSection', (current) => {
            const isActiveSection = current === section;
            element.classList.toggle('current', isActiveSection);
        });

        return () => {};
    });

    return html`
        <button type="button" class="footer-nav__button">${label}</button>
    `;
};
