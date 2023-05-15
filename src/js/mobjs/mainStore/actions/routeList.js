import { mainStore } from '../mainStore';

export const setRouteList = (list) => mainStore.set('routeList', [list]);

export const getRouteList = () => {
    const { routeList } = mainStore.get();
    return routeList?.[0] ?? {};
};

export const setIndex = ({ routeName = '' }) => {
    mainStore.set('index', routeName);
};

export const getIndex = () => {
    const { index } = mainStore.get();
    return index;
};

export const setPageNotFound = ({ routeName = '' }) => {
    mainStore.set('pageNotFound', routeName);
};

export const getPageNotFound = () => {
    const { pageNotFound } = mainStore.get();
    return pageNotFound;
};
