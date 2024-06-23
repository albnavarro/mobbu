import { navigationStore } from '../../navigation/store/navStore';

/**
 * @type {import("../../../../mobjs/type").mobComponent<'label'|'section'>}
 */
export const FooterNavButtonFn = ({ html, onMount, getState }) => {
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
