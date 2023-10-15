// @ts-check
import { loadRoute } from './loadRoute';
import { getRouteModule } from './utils';

/**
 * @description
 * Get hash from url and load new route.
 */
const getHash = () => {
    const locationHash = window.location.hash.slice(1);
    loadRoute({ route: getRouteModule({ url: locationHash }) });
};

/**
 * @description
 * Initialize router.
 */
export const router = () => {
    getHash();
    window.addEventListener('hashchange', () => getHash());
};

/**
 * @description
 * Set hash in current browser url.
 */
export const loadUrl = ({ url = '' }) => {
    window.location.hash = url;
};
