import { mobCore } from '../../../mobCore';
import { getIdByInstanceName, mainStore, setStateById } from '../../../mobjs';
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
}) => {
    const { label, url, arrowClass, subMenuClass, fireRoute, callback } =
        getState();

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
                element.classList.toggle('current', current === url);
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
                    callback();

                    if (!fireRoute) return;

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
