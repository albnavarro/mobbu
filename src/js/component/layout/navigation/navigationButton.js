import { mobCore } from '../../../mobCore';
import {
    getIdByInstanceName,
    getStateById,
    mainStore,
    setStateById,
} from '../../../mobjs';
import { navigationStore } from './store/navStore';

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationButton = ({
    getState,
    html,
    onMount,
    watch,
    delegateEvents,
    id,
}) => {
    const { label, url, arrowClass, subMenuClass, fireRoute, callback } =
        getState();

    const state = getStateById(id);
    console.log(state);

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
        mainStore.watch('activeRoute', (current) => {
            mobCore.useFrame(() => {
                const isActiveRoute = current === url;
                element.classList.toggle('current', isActiveRoute);

                /**
                 * Set current accordion menu open state.
                 * On load route, or if route is loaded outside menu.
                 */
                if (isActiveRoute && fireRoute) {
                    callback();
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
                    const pageTransitionId =
                        getIdByInstanceName('page-transition');
                    setStateById(pageTransitionId, 'url', url);

                    navigationStore.set('navigationIsOpen', false);
                    navigationStore.emit('closeNavigation');
                },
            })}
        >
            ${label}
        </button>
    `;
};
