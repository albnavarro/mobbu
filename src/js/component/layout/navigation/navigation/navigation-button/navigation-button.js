/**
 * @import {MobComponent} from "@mobJsType"
 * @import {NavigationButtonType} from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<NavigationButtonType>} */
export const NavigationButtonFn = ({
    delegateEvents,
    getProxi,
    bindEffect,
}) => {
    const proxi = getProxi();

    const {
        label,
        url,
        arrowClass,
        subMenuClass,
        fireRoute,
        callback,
        scrollToSection,
        activeId,
        forceChildren,
    } = proxi;

    MobJs.afterRouteChange(({ currentRoute }) => {
        MobCore.useFrame(() => {
            const urlParsed = url.split('?');

            /**
             * Get hash.
             */
            const hash = urlParsed?.[0] ?? '';

            /**
             * Check is activeId match with route
             */
            const activeParams = MobJs.getActiveParams();

            const paramsMatch =
                activeId === -1 || activeParams?.['activeId'] === `${activeId}`;

            const isActiveRoute = currentRoute === hash && paramsMatch;

            /**
             * Match virtual children, with no submenu. Virtual children is defined in forceChildren props
             */
            const forceChildrenMatch = forceChildren.includes(currentRoute);
            proxi.isCurrent = isActiveRoute || forceChildrenMatch;

            /**
             * Set current accordion menu open state. On load route, or if route is loaded outside menu.
             */
            if (isActiveRoute && fireRoute) {
                callback();

                /**
                 * Aign menu to current active main section label
                 */
                navigationStore.set('activeNavigationSection', scrollToSection);
            }
        });
    });

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: ['link', arrowClass, subMenuClass],
        modules: [
            delegateEvents({
                click: () => {
                    /**
                     * Set current accordion menu open state. On Submenu label click.
                     */
                    callback();
                    if (!fireRoute) return;

                    /**
                     * Fire page transition if button is cliccable.
                     */
                    MobJs.loadUrl({ url });
                    navigationStore.set('navigationIsOpen', false);
                },
            }),
            bindEffect({
                toggleClass: {
                    active: () => proxi.isOpen,
                    current: () => proxi.isCurrent,
                },
            }),
        ],
        content: label,
    });
};
