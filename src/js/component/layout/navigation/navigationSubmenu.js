//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { NavigationSubmenu } from './type';
 **/

import { html, useMethodByName } from '../../../mobjs';
import { slide } from '../../../mobMotion/plugin';

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
            useMethodByName('navigation-container')?.refresh();
            if (isOpen) return;

            /**
             * When accordion is closed form element itSelf
             * Need to reset currentAccordionId without fire callback.
             */
            useMethodByName('main_navigation')?.closeAllAccordion({
                fireCallback: false,
            });
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
                        updateState('isOpen', (prev) => !prev);
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
