//@ts-check

import { getIdByInstanceName, html, setStateById } from '../../../mobjs';
import { slide } from '../../../mobMotion/plugin';
import { navigationStore } from './store/navStore';

function getSubmenu({ children, staticProps, callback }) {
    return children
        .map((child) => {
            const { label, url, scrollToSection, activeId } = child;

            return html`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${staticProps({
                            callback,
                            label,
                            url,
                            subMenuClass: 'l-navigation__link--submenu',
                            scrollToSection,
                            activeId: activeId ?? -1,
                        })}
                    ></mob-navigation-button>
                </li>
            `;
        })
        .join('');
}

/**
 * @type {import("../../../mobjs/type").mobComponent<import('./type').NavigationSubmenu>}
 */
export const NavigationSubmenuFn = ({
    onMount,
    html,
    getState,
    setState,
    staticProps,
    bindProps,
    watchSync,
}) => {
    const { children, headerButton, callback } = getState();
    const { label, url, activeId } = headerButton;

    onMount(({ ref }) => {
        /**
         * Accordion
         */
        const { content } = ref;

        slide.subscribe(content);
        slide.reset(content);

        watchSync('isOpen', async (isOpen) => {
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
                    activeId: activeId ?? -1,
                    callback: () => {
                        setState('isOpen', (prev) => !prev);
                        const { isOpen } = getState();
                        if (isOpen) callback();
                    },
                })}
                ${bindProps({
                    bind: ['isOpen'],
                    /** @returns {Partial<import('./type').NavigationButton>} */
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
