import { MobJs } from '@mobJs';

/**
 * @param {object} params
 * @param {HTMLElement} params.root
 */
const setFocusToFristCta = ({ root }) => {
    const firstCta = /** @type {HTMLElement | null} */ (
        root.querySelector('.index-0')
    );

    firstCta?.focus();
};

/**
 * Set focus to first link item after route change
 */
export const setTemplateLinkFocus = () => {
    const unsubcribeRouteChange = MobJs.afterRouteChange(() => {
        const root = MobJs.getRoot();
        if (!root) return;

        const isLoading = MobJs.mainStore.getProp('routeIsLoading');

        /**
         * Route is loaded set focus
         */
        if (!isLoading) {
            setFocusToFristCta({ root });
            unsubcribeRouteChange();
            return;
        }

        /**
         * Wait for route loading completed.
         */
        const unsubscribeRouteIsLoading = MobJs.mainStore.watch(
            'routeIsLoading',
            (val) => {
                if (!val) {
                    setFocusToFristCta({ root });
                }

                unsubscribeRouteIsLoading();
                unsubcribeRouteChange();
            }
        );
    });
};
