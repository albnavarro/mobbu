//@ts-check

import { mobCore } from '../../../mobCore';
import { loadUrl, mainStore, MAIN_STORE_ACTIVE_ROUTE } from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @type {import('../../../mobjs/type').MobComponent<import('./type').NavigationButton>}
 */
export const NavigationButtonFn = ({
    getState,
    html,
    onMount,
    watch,
    delegateEvents,
}) => {
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

    onMount(({ element }) => {
        /**
         * Is a toggle accordion.
         */
        watch('isOpen', (isOpen) => {
            mobCore.useFrame(() => {
                element.classList.toggle('active', isOpen);
            });
        });

        /**
         * Is a link button.
         */
        mainStore.watch(MAIN_STORE_ACTIVE_ROUTE, (current) => {
            mobCore.useFrame(() => {
                const urlParsed = url.split('?');

                /**
                 * Get hash.
                 */
                const hash = urlParsed?.[0] ?? '';

                /**
                 * Check is activeId match with route
                 */
                const { activeParams } = mainStore.get();
                const paramsMatch =
                    activeId === -1 || activeParams?.['activeId'] === activeId;

                const isActiveRoute = current === hash && paramsMatch;
                element.classList.toggle('current', isActiveRoute);

                /**
                 * Set current accordion menu open state.
                 * On load route, or if route is loaded outside menu.
                 */
                if (isActiveRoute && fireRoute) {
                    callback();

                    /**
                     * Aign menu to current active main section label
                     */
                    navigationStore.set(
                        'activeNavigationSection',
                        scrollToSection
                    );
                }
            });
        });

        return () => {};
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
        >
            ${label}
        </button>
    `;
};
