import { navigationStore } from '../../navigation/store/navStore';

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const FooterNavButton = ({ html, onMount, getState }) => {
    const { label, section } = getState();

    onMount(({ element }) => {
        navigationStore.watch('activeSection', (current) => {
            const isActiveSection = current === section;
            element.classList.toggle('current', isActiveSection);
        });
    });

    return html`
        <button type="button" class="footer-nav__button">${label}</button>
    `;
};
