import {
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './constant';
import { mainStore } from './mainStore';

/** @type{import('./type').MainStoreWatch} */
export const beforeRouteChange = (callback) => {
    return mainStore.watch(
        MAIN_STORE_BEFORE_ROUTE_CHANGE,
        ({ route, templateName }) => {
            callback({ route, templateName });
        }
    );
};

/** @type{import('./type').MainStoreWatch} */
export const beforeRouteLeave = (callback) => {
    return mainStore.watch(
        MAIN_STORE_BEFORE_ROUTE_LEAVES,
        ({ route, templateName }) => {
            callback({ route, templateName });
        }
    );
};

/** @type{import('./type').MainStoreWatch} */
export const afterRouteChange = (callback) => {
    return mainStore.watch(
        MAIN_STORE_AFTER_ROUTE_CHANGE,
        ({ route, templateName }) => {
            callback({ route, templateName });
        }
    );
};

/** @type{import('./type').MainStoreLoading} */
export const onRouteLoading = (callback) => {
    return mainStore.watch(MAIN_STORE_ROUTE_IS_LOADING, (state) => {
        callback(state);
    });
};

/** @type{import('./type').MainStoreActiveRoute} */
export const getActiveRoute = () => {
    const { activeRoute } = mainStore.get();
    return activeRoute;
};

/** @type{import('./type').MainStoreActiveParams} */
export const getActiveParams = () => {
    const { activeParams } = mainStore.get();
    return activeParams;
};
