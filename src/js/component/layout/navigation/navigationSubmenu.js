import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { slide } from '../../../mobMotion/plugin';
import { navigationStore } from './store/navStore';

function getSubmenu({ children, staticProps, callback }) {
    return children
        .map((child) => {
            const { label, url, scrollToSection } = child;

            return html`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${staticProps({
                            callback,
                            label,
                            url,
                            subMenuClass: 'l-navigation__link--submenu',
                            scrollToSection,
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
    html,
    getState,
    setState,
    staticProps,
    bindProps,
    watch,
}) => {
    const { children, headerButton, callback } = getState();
    const { label, url } = headerButton;

    onMount(({ refs }) => {
        /**
         * Accordion
         */
        const { content } = refs;

        slide.subscribe(content);
        slide.reset(content);

        watch('isOpen', async (isOpen) => {
            const action = isOpen ? 'down' : 'up';

            await slide[action](content);
            navigationStore.emit('refreshScroller');

            /**
             * When accordion is closed form element itSelf
             * Need to reset currentAccordionId without fire callback.
             */
            if (!isOpen) {
                const navId = getIdByInstanceName('main_navigation');
                setStateById(navId, 'currentAccordionId', -1, false);
            }
        });

        return () => {};
    });

    return html`
        <li class="l-navigation__item has-child">
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
            <ul class="l-navigation__submenu" ref="content">
                ${getSubmenu({ children, staticProps, callback })}
            </ul>
        </li>
    `;
};
