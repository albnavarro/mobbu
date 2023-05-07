import { loadRoute } from '.';
import { mainStore } from '../mainStore/mainStore';
import { getRouteModule } from './routeList';

const getHash = () => {
    const locationHash = window.location.hash.substring(1);
    const { activeRoute } = mainStore.get();
    const removePrevious = activeRoute.length;
    loadRoute({ route: getRouteModule({ url: locationHash }), removePrevious });
};

export const router = () => {
    getHash();
    window.addEventListener('hashchange', () => getHash());
};
