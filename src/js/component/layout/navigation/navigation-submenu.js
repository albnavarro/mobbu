/**
 * @import {MobComponent, ProxiState, ReturnBindProps, StaticProps, UseMethodByName} from '@mobJsType';
 * @import {Navigation, NavigationButton, NavigationContainer, NavigationSubmenu} from './type';
 */

import { html, MobJs } from '@mobJs';
import { MobSlide } from '@mobMotionPlugin';
import {
    mobNavigationContainerName,
    mobNavigationName,
} from '../../instance-name';

/**
 * @param {object} params
 * @param {ProxiState<NavigationSubmenu>} params.proxi
 * @param {StaticProps<NavigationButton>} params.staticProps
 * @returns {string}
 */
function getSubmenu({ proxi, staticProps }) {
    return proxi.children
        .map((child) => {
            const { label, url, scrollToSection, activeId } = child;

            return html`
                <li class="l-navigation__submenu__item">
                    <mob-navigation-button
                        ${staticProps(
                            /** @type {NavigationButton['props']} */ ({
                                label,
                                url,
                                subMenuClass: 'l-navigation__link--submenu',
                                scrollToSection,
                                activeId: activeId ?? -1,
                                callback: () => {
                                    /**
                                     * When navigate inside submenu submenu should not toggle
                                     *
                                     * - Callback is fired if current route match with active id.
                                     * - Callback is used for open submenu on route load.
                                     */
                                    proxi.callback({
                                        forceClose: false,
                                    });
                                },
                            })
                        )}
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
    staticProps,
    bindProps,
    watch,
    setRef,
    getRef,
    getProxi,
}) => {
    const proxi = getProxi();
    const { label, url, activeId } = proxi.headerButton;

    onMount(() => {
        /**
         * Accordion
         */
        const { content } = getRef();

        MobSlide.subscribe(content);
        MobSlide.reset(content);

        watch(
            () => proxi.isOpen,
            async (isOpen) => {
                const action = isOpen ? 'down' : 'up';
                await MobSlide[action](content);

                /** @type {UseMethodByName<NavigationContainer>} */
                const navContainerMethods = MobJs.useMethodByName(
                    mobNavigationContainerName
                );
                navContainerMethods?.refresh();

                if (isOpen) return;

                /**
                 * When accordion is closed form element itSelf Need to reset currentAccordionId without fire callback.
                 */

                /** @type {UseMethodByName<Navigation>} */
                const mainNavigationMethods =
                    MobJs.useMethodByName(mobNavigationName);

                mainNavigationMethods?.closeAllAccordion({
                    fireCallback: false,
                });
            },
            { immediate: true }
        );

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return html`
        <li class="l-navigation__item has-child">
            <mob-navigation-button
                ${staticProps(
                    /** @type {NavigationButton['props']} */ ({
                        label,
                        url,
                        arrowClass: 'l-navigation__link--arrow',
                        fireRoute: false,
                        activeId: activeId ?? -1,
                        callback: () => {
                            /**
                             * Trigger close current accordion if is open
                             */
                            proxi.callback({ forceClose: proxi.isOpen });
                        },
                    })
                )}
                ${bindProps(
                    /** @returns {ReturnBindProps<NavigationButton>} */
                    () => ({
                        isOpen: proxi.isOpen,
                    })
                )}
            ></mob-navigation-button>
            <ul class="l-navigation__submenu" ${setRef('content')}>
                ${getSubmenu({ proxi, staticProps })}
            </ul>
        </li>
    `;
};
