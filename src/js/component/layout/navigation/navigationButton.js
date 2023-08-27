import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationButton = ({ getState, render, onMount }) => {
    const { label, url, arrowClass, subMenuClass, fireRoute } = getState();

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            if (!fireRoute) return;

            const pageTransitionId = getIdByInstanceName('page-transition');
            setStateById(pageTransitionId, 'url', url);

            navigationStore.set('navigationIsOpen', false);
            navigationStore.emit('closeNavigation');
            navigationStore.emit('goToTop');
        });
    });

    return render(/* HTML */ `
        <button class="l-navigation__link ${arrowClass} ${subMenuClass}">
            ${label}
        </button>
    `);
};
