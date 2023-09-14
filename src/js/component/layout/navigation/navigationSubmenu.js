import { slide } from '../../../mobMotion/plugin';
import { navigationStore } from './store/navStore';

function getSubmenu(children, staticProps) {
    return children
        .map((child) => {
            const { label, url } = child;

            return /* HTML */ `
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${staticProps({
                            label,
                            url,
                            subMenuClass: 'l-navigation__link--submenu',
                        })}
                    ></mob-navigation-button>
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
    bindProps,
    watch,
}) => {
    const { children, headerButton, callback } = getState();
    const { label, url } = headerButton;

    onMount(({ element }) => {
        /**
         * Accordion
         */
        const content = element.querySelector('.l-navigation__submenu');
        slide.subscribe(content);
        slide.reset(content);

        watch('isOpen', (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            slide[action](content);
        });

        navigationStore.watch('closeAllAccordion', () => {
            setState('isOpen', false);
        });

        return () => {};
    });

    return render(/* HTML */ `
        <mob-navigation-submenu class="l-navigation__item has-child">
            <mob-navigation-button
                ${staticProps({
                    label,
                    url,
                    arrowClass: 'l-navigation__link--arrow',
                    fireRoute: false,
                    callback: () => {
                        setState('isOpen', (prev) => !prev);
                        const { isOpen } = getState('isOpen');
                        if (isOpen) callback();
                    },
                })}
                ${bindProps({
                    bind: ['isOpen'],
                    props: ({ isOpen }) => {
                        return { isOpen };
                    },
                })}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu">
                ${getSubmenu(children, staticProps)}
            </ul>
        </mob-navigation-submenu>
    `);
};
