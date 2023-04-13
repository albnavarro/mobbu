import { loadRoute } from '../../route';
import { navigationStore } from './navStore';

export const NavigationButton = ({ props, render, onMount }) => {
    onMount(({ element }) => {
        element.addEventListener('click', () => {
            loadRoute({ route: url });
            navigationStore.set('navigationIsOpen', false);
            navigationStore.emit('closeNavigation');
        });
    });

    const { label = '', url = '#', arrowClass = '', subMenuClass = '' } = props;
    return render(/* HTML */ `
        <button class="l-navigation__link ${arrowClass} ${subMenuClass}">
            ${label}
        </button>
    `);
};
