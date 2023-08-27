import { slide } from '../../../mobbu/plugin';
import { navigationStore } from './store/navStore';

function getSubmenu(children, staticProps) {
    return children
        .map((child) => {
            const { label, url } = child;

            return /* HTML */ `
                <li class="l-navigation__submenu__item">
                    <NavigationButton
                        ${staticProps({
                            label,
                            url,
                            ...{ subMenuClass: 'l-navigation__link--submenu' },
                        })}
                    ></NavigationButton>
                </li>
            `;
        })
        .join('');
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const NavigationSubmenu = ({
    onMount,
    render,
    getState,
    setState,
    staticProps,
    watch,
}) => {
    const { children, headerButton } = getState();
    const { label, url } = headerButton;

    onMount(({ element }) => {
        /**
         * Accordion
         */
        const button = element.querySelector('.l-navigation__link--arrow');
        const content = element.querySelector('.l-navigation__submenu');
        slide.subscribe(content);
        slide.reset(content);

        button.addEventListener('click', () => {
            setState('isOpen', (prev) => !prev);
        });

        watch('isOpen', (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            slide[action](content);
            button.classList.toggle('active', isOpen);
        });

        navigationStore.watch('closeAllItems', () => {
            setState('isOpen', false);
        });

        return () => {};
    });

    return render(/* HTML */ `
        <li class="l-navigation__item has-child">
            <NavigationButton
                ${staticProps({
                    label,
                    url,
                    arrowClass: 'l-navigation__link--arrow',
                    fireRoute: false,
                })}
            ></NavigationButton>
            <ul class="l-navigation__submenu">
                ${getSubmenu(children, staticProps)}
            </ul>
        </li>
    `);
};
