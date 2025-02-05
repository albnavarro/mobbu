//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { NavigationButton } from './type';
 **/

import { mobCore } from '../../../mobCore';
import { loadUrl, afterRouteChange, getActiveParams } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/** @type {MobComponent<NavigationButton>} */
export const NavigationButtonFn = ({
    setState,
    getState,
    html,
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

    afterRouteChange(({ route }) => {
        mobCore.useFrame(() => {
            const urlParsed = url.split('?');

            /**
             * Get hash.
             */
            const hash = urlParsed?.[0] ?? '';

            /**
             * Check is activeId match with route
             */
            const activeParams = getActiveParams();

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
                    loadUrl({ url });
                    navigationStore.set('navigationIsOpen', false);
                },
            })}
            ${bindEffect({
                bind: ['isOpen', 'isCurrent'],
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
