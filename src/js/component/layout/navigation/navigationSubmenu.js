//@ts-check

/**
 * @import { MobComponent, ReturnBindProps, StaticProps, UseMethodByName } from '../../../mobjs/type';
 * @import { Navigation, NavigationButton, NavigationContainer, NavigationSubmenu } from './type';
 **/

import { html, useMethodByName } from '../../../mobjs';
import { MobSlide } from '../../../mobMotion/plugin';

/**
 * @param {object} params
 * @param {import('../../../data/type').NavigationChildren[]} params.children
 * @param {StaticProps<NavigationButton>} params.staticProps
 * @param {() => void} params.callback
 * @returns {string}
 */
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
 * @type {MobComponent<NavigationSubmenu>}
 */
export const NavigationSubmenuFn = ({
    onMount,
    html,
    getState,
    updateState,
    staticProps,
    bindProps,
    watch,
    setRef,
    getRef,
}) => {
    const { children, headerButton, callback } = getState();
    const { label, url, activeId } = headerButton;

    onMount(() => {
        /**
         * Accordion
         */
        const { content } = getRef();

        MobSlide.subscribe(content);
        MobSlide.reset(content);

        watch(
            'isOpen',
            async (isOpen) => {
                const action = isOpen ? 'down' : 'up';
                await MobSlide[action](content);

                /** @type{UseMethodByName<NavigationContainer>} */
                const navContainerMethods = useMethodByName(
                    'navigation-container'
                );
                navContainerMethods?.refresh();

                if (isOpen) return;

                /**
                 * When accordion is closed form element itSelf
                 * Need to reset currentAccordionId without fire callback.
                 */

                /** @type{UseMethodByName<Navigation>} */
                const mainNavigationMethods =
                    useMethodByName('main_navigation');
                mainNavigationMethods?.closeAllAccordion({
                    fireCallback: false,
                });
            },
            { immediate: true }
        );

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
                        updateState('isOpen', (prev) => !prev);
                        const { isOpen } = getState();
                        if (isOpen) callback();
                    },
                })}
                ${bindProps({
                    bind: ['isOpen'],
                    /** @returns {ReturnBindProps<NavigationButton>} */
                    props: ({ isOpen }) => {
                        return { isOpen };
                    },
                })}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${setRef('content')}>
                ${getSubmenu({ children, staticProps, callback })}
            </ul>
        </li>
    `;
};
