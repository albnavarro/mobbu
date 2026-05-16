import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_PARSER_ASYNC,
    MAIN_STORE_ROUTE_IS_LOADING,
    PARSER_ASYNC_DEFAULT,
} from './constant';

/**
 * @import {MobStoreParams} from "../../mob-core/store/type"
 */

export const mainStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').MainStore>} */
    ({
        [MAIN_STORE_ACTIVE_ROUTE]: {
            __value: { route: '', templateName: '' },
            __type: 'any',
            __skipEqual: false,
        },
        [MAIN_STORE_ACTIVE_PARAMS]: {
            __value: {},
            __type: 'any',
            __skipEqual: false,
        },
        [MAIN_STORE_BEFORE_ROUTE_CHANGE]: {
            __value: {
                currentRoute: '',
                currentTemplate: '',
                nextRoute: '',
                nextTemplate: '',
            },
            __type: 'any',
            __skipEqual: false,
        },
        [MAIN_STORE_AFTER_ROUTE_CHANGE]: {
            __value: {
                currentRoute: '',
                currentTemplate: '',
                previousRoute: '',
                previousTemplate: '',
            },
            __type: 'any',
            __skipEqual: false,
        },
        [MAIN_STORE_ROUTE_IS_LOADING]: {
            __value: false,
            __type: Boolean,
        },
        [MAIN_STORE_PARSER_ASYNC]: {
            element: {
                __value: document.createElement('div'),
                __type: HTMLElement,
                __skipEqual: false,
            },
            persistent: {
                __value: false,
                __type: Boolean,
                __skipEqual: false,
            },
            source: {
                __value: PARSER_ASYNC_DEFAULT,
                __type: String,
                __skipEqual: false,
            },
        },
    })
);

/**
 * Remove DOM element from store. WeakMap/WaekRef need no DOM element reference around app.
 *
 * @returns Void
 */
export const resetMainStoreAsyncParser = () => {
    mainStore.set(
        MAIN_STORE_PARSER_ASYNC,
        {
            element: document.createElement('div'),
            persistent: false,
            source: PARSER_ASYNC_DEFAULT,
        },
        { emit: false }
    );
};
