// @ts-check

import { mobCore } from '../../mobCore';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_INDEX_PAGE,
    MAIN_STORE_PAGE_NOT_FOUND,
    MAIN_STORE_REPEATER_PARSER_ROOT,
    MAIN_STORE_ROUTE_IS_LOADING,
    MAIN_STORE_ROUTE_LIST,
} from './constant';

export const mainStore = mobCore.createStore({
    [MAIN_STORE_INDEX_PAGE]: () => ({
        value: '',
        type: String,
    }),
    [MAIN_STORE_PAGE_NOT_FOUND]: () => ({
        value: '',
        type: String,
    }),
    [MAIN_STORE_ROUTE_LIST]: () => ({
        value: {},
        type: 'any',
    }),
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
    [MAIN_STORE_REPEATER_PARSER_ROOT]: () => ({
        value: document.createElement('div'),
        type: HTMLElement,
    }),
});
