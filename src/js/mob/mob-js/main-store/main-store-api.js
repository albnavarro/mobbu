import {
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './constant';
import { mainStore } from './main-store';

/** @type {import('./type').MainStoreWatchBefore} */
export const beforeRouteChange = (callback) => {
    return mainStore.watch(
        MAIN_STORE_BEFORE_ROUTE_CHANGE,
        ({ currentRoute, currentTemplate, nextRoute, nextTemplate }) => {
            callback({
                currentRoute,
                currentTemplate,
                nextRoute,
                nextTemplate,
            });
        }
    );
};

/** @type {import('./type').MainStoreWatchAfter} */
export const afterRouteChange = (callback) => {
    return mainStore.watch(
        MAIN_STORE_AFTER_ROUTE_CHANGE,
        ({
            currentRoute,
            currentTemplate,
            previousRoute,
            previousTemplate,
        }) => {
            callback({
                currentRoute,
                currentTemplate,
                previousRoute,
                previousTemplate,
            });
        }
    );
};

/** @type {import('./type').MainStoreLoading} */
export const onRouteLoading = (callback) => {
    return mainStore.watch(MAIN_STORE_ROUTE_IS_LOADING, (state) => {
        callback(state);
    });
};

/** @type {import('./type').MainStoreActiveRoute} */
export const getActiveRoute = () => {
    const { activeRoute } = mainStore.get();
    return activeRoute;
};

/** @type {import('./type').MainStoreActiveParams} */
export const getActiveParams = () => {
    const { activeParams } = mainStore.get();
    return activeParams;
};
