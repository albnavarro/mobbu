import { mobCore } from '../../../mobCore';
import { navigationStore } from '../navigation/store/navStore';

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const FooterNavButton = ({ html, onMount, getState }) => {
    const { label, section } = getState();

    onMount(({ element }) => {
        navigationStore.watch('activeSection', (current) => {
            const isActiveSection = current === section;
            console.log(isActiveSection);
            element.classList.toggle('current', isActiveSection);
        });
    });

    return html`
        <button type="button" class="footer-nav__button">${label}</button>
    `;
};
