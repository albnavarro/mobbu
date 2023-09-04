import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationButton = ({ getState, render, onMount, watch }) => {
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
        });

        watch('isOpen', (isOpen) => {
            element.classList.toggle('active', isOpen);
        });

        return () => {};
    });

    return render(/* HTML */ `
        <button class="l-navigation__link ${arrowClass} ${subMenuClass}">
            ${label}
        </button>
    `);
};
