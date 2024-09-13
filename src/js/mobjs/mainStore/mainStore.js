// @ts-check

import { mobCore } from '../../mobCore';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_ASYNC_PARSER,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './constant';

/**
 * @type {import('../../mobCore/store/type').MobStore<import('./type').MainStore>}
 */
export const mainStore = mobCore.createStore({
    [MAIN_STORE_ACTIVE_ROUTE]: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    [MAIN_STORE_ACTIVE_PARAMS]: () => ({
        value: {},
        type: 'any',
        skipEqual: false,
    }),
    [MAIN_STORE_BEFORE_ROUTE_LEAVES]: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    [MAIN_STORE_BEFORE_ROUTE_CHANGE]: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    [MAIN_STORE_AFTER_ROUTE_CHANGE]: () => ({
        value: '',
        type: String,
        skipEqual: false,
    }),
    [MAIN_STORE_ROUTE_IS_LOADING]: () => ({
        value: false,
        type: Boolean,
    }),
    [MAIN_STORE_ASYNC_PARSER]: {
        element: () => ({
            value: document.createElement('div'),
            type: HTMLElement,
            skipEqual: false,
        }),
        parentId: () => ({
            value: '',
            type: String,
            skipEqual: false,
        }),
    },
});
