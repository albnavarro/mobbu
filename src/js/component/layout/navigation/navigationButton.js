//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { NavigationButton } from './type';
 **/

import { MobCore } from '../../../mobCore';
import { html, MobJs } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/** @type {MobComponent<NavigationButton>} */
export const NavigationButtonFn = ({
    setState,
    getState,
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
    } = getState();

    MobJs.afterRouteChange(({ route }) => {
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

            const isActiveRoute = route === hash && paramsMatch;
            setState('isCurrent', isActiveRoute);

            /**
             * Set current accordion menu open state.
             * On load route, or if route is loaded outside menu.
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

    return html`
        <button
            type="button"
            class="l-navigation__link  ${arrowClass} ${subMenuClass}"
            ${delegateEvents({
                click: () => {
                    /**
                     * Set current accordion menu open state.
                     * On Submenu label click.
                     */
                    callback();
                    if (!fireRoute) return;

                    /**
                     * Fire page transition if button is cliccable.
                     */
                    MobJs.loadUrl({ url });
                    navigationStore.set('navigationIsOpen', false);
                },
            })}
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.isOpen,
                    current: () => proxi.isCurrent,
                },
            })}
        >
            ${label}
        </button>
    `;
};
