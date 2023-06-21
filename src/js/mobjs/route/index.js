// @ts-check

import { core } from '../../mobbu';
import { parseComponents } from '../componentParse';
import { removeCancellableComponentFromStore } from '../componentStore/action/removeAndDestroy';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../mainStore/actions/componentList';
import { removeOrphansPropsFromParent } from '../mainStore/actions/props';
import { getRoot, setRoot } from '../mainStore/actions/root';
import {
    getRouteList,
    setIndex,
    setPageNotFound,
    setRouteList,
} from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';
import { router } from './router';
import { debugRoute } from './test';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.root
 * @param {{ string:{componentFunction:function,props:Object,state:Object} }|{}} obj.componentList
 * @param {{string:function():string}|{}} obj.routeList
 * @param {Function} obj.afterInit
 * @param {String} obj.index
 * @param {String} obj.pageNotFound
 *
 * @description
 * Inizializa default route.
 */
export const inizializeApp = async ({
    root,
    componentList = {},
    routeList = {},
    afterInit = () => {},
    index = 'home',
    pageNotFound = 'pageNotFound',
}) => {
    if (!root) return;

    /**
     *
     */
    setComponentList(componentList);

    /**
     *
     */
    setRouteList(routeList);

    /**
     * Set idnex route
     */
    setIndex({ routeName: index });

    /**
     * Set idnex route
     */
    setPageNotFound({ routeName: pageNotFound });

    /**
     *
     */
    setRoot({ root });

    /**
     * Render common layout component.
     * Inizialize js on common layout component.
     */
    await parseComponents({ element: document.body });

    /**
     * First callback after parse index.html first time.
     * Wait 5 frames, so browser can clear gargbage collector created in parse step.
     */
    core.useFrameIndex(() => {
        core.useNextTick(() => {
            afterInit();
        });
    }, frameDelayAfterParse);

    /**
     * Debug
     */
    debugRoute();

    /**
     * Start router.
     */
    router();
};

/**
 * @param {Object} obj
 * @param {String} obj.route
 * @param {Boolean} obj.removePrevious - Remove previous cancellabel elements.
 *
 * @description
 * Load new route.
 */
export const loadRoute = async ({ route = '', removePrevious = true }) => {
    /**
     *
     */
    const root = getRoot();

    /**
     * @type {{ activeRoute:String }}
     * Set before Route leave.
     */
    const { activeRoute } = mainStore.get();
    mainStore.set('beforeRouteLeave', activeRoute);

    /**
     * Set before Change props
     */
    mainStore.set('beforeRouteChange', route);

    /**
     * If another route change during loading current route
     * ( async route woth some delay or similar )
     * skip fire after route change event
     */
    let skip = false;
    const unWatchRouteChange = mainStore.watch('beforeRouteChange', () => {
        skip = true;
    });

    /**
     * Remove from component store all camcellbale elment and it's child.
     */
    if (removePrevious) removeCancellableComponentFromStore();

    /**
     * Set new active route.
     */
    mainStore.set('activeRoute', route);
    const content = getRouteList()?.[route]?.({ root });
    root.innerHTML = '';
    root.insertAdjacentHTML('afterbegin', content);

    /**
     * Remove props reference.
     * Async loading and iterrupt can leave rubbish.
     */
    removeOrphansPropsFromParent();

    /**
     * Wait for all render.
     */
    await parseComponents({ element: root });

    /**
     * SKit after route change if another route is called.
     */
    if (!skip) mainStore.set('atfterRouteChange', route);

    /**
     * Set active route to body data-route
     */
    document.body.dataset.route = route;

    /**
     * Remove watcher.
     */
    unWatchRouteChange?.();
};
