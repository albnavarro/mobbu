import { getIdByInstanceName, setStateById } from '../../../mobjs';
import { navigationStore } from './store/navStore';

export const NavigationButton = ({ props, render, onMount }) => {
    const { label, url, arrowClass, subMenuClass, fireRoute } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            if (!fireRoute) return;

            const pageTransitionId = getIdByInstanceName('page-transition');
            setStateById(pageTransitionId, 'url', url);

            navigationStore.set('navigationIsOpen', false);
            navigationStore.emit('closeNavigation');
        });
    });

    return render(/* HTML */ `
        <button class="l-navigation__link ${arrowClass} ${subMenuClass}">
            ${label}
        </button>
    `);
};
