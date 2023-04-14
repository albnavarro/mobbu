import { navigationStore } from './navStore';

export const NavigationButton = ({ props, render, onMount }) => {
    const {
        label = '',
        url = '#',
        arrowClass = '',
        subMenuClass = '',
        fireRoute = true,
    } = props;

    onMount(({ element }) => {
        element.addEventListener('click', () => {
            if (!fireRoute) return;

            window.location.hash = url;
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
