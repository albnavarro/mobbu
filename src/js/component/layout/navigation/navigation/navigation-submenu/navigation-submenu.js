/**
 * @import {
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {NavigationButtonType} from "../navigation-button/type"
 * @import {NavigationSubmenuType} from "./type"
 */

import { fromObject } from '@mobJs';
import { MobSlide } from '@mobMotionPlugin';
import { refreshNavigationScroller } from '../../utils';
import { closeAllNavAccordion } from '../utils';
import { NavigationButton } from '../navigation-button/definition';

/**
 * @param {object} params
 * @param {ProxiState<NavigationSubmenuType>} params.proxi
 * @param {StaticProps<NavigationButtonType>} params.staticProps
 * @returns {string[]}
 */
function getSubmenu({ proxi, staticProps }) {
    return proxi.children.map((child) => {
        const { label, url, scrollToSection, activeId } = child;

        return fromObject({
            tag: 'li',
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

    return fromObject({
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
                ],
            },
            {
                tag: 'ul',
                className: 'submenu',
                modules: setRef('content'),
                content: getSubmenu({ proxi, staticProps }),
            },
        ],
    });
};
