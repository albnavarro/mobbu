import { MobJs } from '@mobJs';

/**
 * @param {object} params
 * @param {HTMLElement} params.root
 */
const applyFocus = ({ root }) => {
    const h1 = /** @type {HTMLElement | null} */ (root.querySelector('h1'));
    h1?.setAttribute('tabindex', '-1');
    if (!focus) return;

    h1?.focus({ preventScroll: true });
};

/**
 * Set focus to first link item after route change
 */
export const setFocusToH1 = () => {
    MobJs.afterRouteChange(() => {
        const root = MobJs.getRoot();
        if (!root) return;

        const isLoading = MobJs.mainStore.getProp('routeIsLoading');

        /**
         * Route is loaded set focus
         */
        if (!isLoading) {
            applyFocus({ root });
            return;
        }

        /**
         * Wait for route loading completed.
         */
        const unsubscribeRouteIsLoading = MobJs.mainStore.watch(
            'routeIsLoading',
            (val) => {
                if (!val) {
                    applyFocus({ root });
                }

                unsubscribeRouteIsLoading();
            }
        );
    });
};
