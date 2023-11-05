import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationButton = ({ getState, html, onMount, watch, id }) => {
    const { label, url, arrowClass, subMenuClass, fireRoute, callback } =
        getState();

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            callback();

            if (!fireRoute) return;

            const pageTransitionId = getIdByInstanceName('page-transition');
            setStateById(pageTransitionId, 'url', url);

            navigationStore.set('navigationIsOpen', false);
            navigationStore.emit('closeNavigation');

            navigationStore.set('currentButtonId', id);
        });

        /**
         * Is a toggle accordion.
         */
        watch('isOpen', (isOpen) => {
            element.classList.toggle('active', isOpen);
        });

        /**
         * Is a link button.
         */
        navigationStore.watch('currentButtonId', (current) => {
            element.classList.toggle('current', current === id);
        });

        return () => {};
    });

    return html`
        <button
            type="button"
            class="l-navigation__link  ${arrowClass} ${subMenuClass}"
        >
            ${label}
        </button>
    `;
};
