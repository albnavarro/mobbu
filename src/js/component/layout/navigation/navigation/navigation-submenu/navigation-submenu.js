/**
 * @import {
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {NavigationButtonType} from "../navigation-button/type"
 * @import {NavigationSubmenuType} from "./type"
 */

import { htmlObject } from '@mobJs';
import { MobSlide } from '@mobMotionPlugin';
import { refreshNavigationScroller } from '../../utils';
import { closeAllNavAccordion } from '../utils';
import { NavigationButton } from '../navigation-button/definition';
import { MobCore } from '@mobCore';

/**
 * @param {object} params
 * @param {ProxiSelfState<NavigationSubmenuType>} params.proxi
 * @param {StaticProps<NavigationButtonType>} params.staticProps
 * @returns {HTMLElement[]}
 */
function getSubmenu({ proxi, staticProps }) {
    return proxi.children.map((child) => {
        const { label, url, scrollToSection, activeId } = child;

        return htmlObject({
            tag: 'li',
            className: 'submenu-item',
            content: {
                component: NavigationButton,
                modules: staticProps(
                    /** @type {NavigationButtonType['props']} */
                    ({
                        label,
                        url,
                        subMenuClass: 'is-submenu',
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
                ),
            },
        });
    });
}

/**
 * @type {MobComponent<NavigationSubmenuType>}
 */
export const NavigationSubmenuFn = ({
    onMount,
    staticProps,
    bindProps,
    watch,
    setRef,
    getRef,
    getSelfProxi,
    bindEffect,
}) => {
    const proxi = getSelfProxi();
    const { label, url, activeId } = proxi.headerButton;
    const submenuID = MobCore.getUnivoqueId();

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
                refreshNavigationScroller();

                if (isOpen) return;

                /**
                 * When accordion is closed form element itSelf Need to reset currentAccordionId without fire callback.
                 */
                closeAllNavAccordion({
                    fireCallback: false,
                });
            },
            { immediate: true }
        );

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return htmlObject({
        tag: 'li',
        content: [
            {
                component: NavigationButton,
                modules: [
                    staticProps(
                        /** @type {NavigationButtonType['props']} */
                        ({
                            label,
                            url,
                            arrowClass: 'has-arrow',
                            fireRoute: false,
                            activeId: activeId ?? -1,
                            ariaId: submenuID,
                            callback: () => {
                                /**
                                 * Trigger close current accordion if is open
                                 */
                                proxi.callback({ forceClose: proxi.isOpen });
                            },
                        })
                    ),
                    bindProps(
                        /** @returns {ReturnBindProps<NavigationButtonType>} */
                        () => ({
                            isOpen: proxi.isOpen,
                        })
                    ),
                    bindEffect({
                        toggleAttribute: {
                            'aria-expanded': () =>
                                proxi.isOpen ? 'true' : 'false',
                            'aria-label': () =>
                                proxi.isOpen
                                    ? `Close submenu ${label}`
                                    : `Open submenu ${label}`,
                        },
                    }),
                ],
            },
            {
                tag: 'ul',
                className: 'submenu',
                attributes: { id: submenuID },
                modules: [
                    setRef('content'),
                    bindEffect({
                        toggleAttribute: {
                            inert: () => !proxi.isOpen,
                        },
                    }),
                ],
                content: getSubmenu({ proxi, staticProps }),
            },
        ],
    });
};
