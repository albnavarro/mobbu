import { mainStore } from '../mainStore';

export const setRouteList = (list) => mainStore.set('routeList', [list]);

export const getRouteList = () => {
    const { routeList } = mainStore.get();
    return routeList?.[0] ?? {};
};
