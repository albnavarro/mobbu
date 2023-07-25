// @ts-check

import { core } from '../../mobbu';
import { frameDelayAfterParse } from '../constant';
import { setComponentList } from '../mainStore/actions/componentList';
import { setRoot } from '../mainStore/actions/root';
import {
    setIndex,
    setPageNotFound,
    setRouteList,
} from '../mainStore/actions/routeList';
import { parseComponents } from '../parseComponent/componentParse';
import { router } from './router';
import { debugRoute } from './test';

/**
 * @param {Object} obj
 * @param {HTMLElement|null} obj.root
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
