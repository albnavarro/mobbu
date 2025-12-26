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
        [MAIN_STORE_ACTIVE_ROUTE]: () => ({
            value: { route: '', templateName: '' },
            type: 'any',
            skipEqual: false,
        }),
        [MAIN_STORE_ACTIVE_PARAMS]: () => ({
            value: {},
            type: 'any',
            skipEqual: false,
        }),
        [MAIN_STORE_BEFORE_ROUTE_CHANGE]: () => ({
            value: {
                currentRoute: '',
                currentTemplate: '',
                nextRoute: '',
                nextTemplate: '',
            },
            type: 'any',
            skipEqual: false,
        }),
        [MAIN_STORE_AFTER_ROUTE_CHANGE]: () => ({
            value: {
                currentRoute: '',
                currentTemplate: '',
                previousRoute: '',
                previousTemplate: '',
            },
            type: 'any',
            skipEqual: false,
        }),
        [MAIN_STORE_ROUTE_IS_LOADING]: () => ({
            value: false,
            type: Boolean,
        }),
        [MAIN_STORE_PARSER_ASYNC]: {
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
            persistent: () => ({
                value: false,
                type: Boolean,
                skipEqual: false,
            }),
            source: () => ({
                value: PARSER_ASYNC_DEFAULT,
                type: String,
                skipEqual: false,
            }),
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
            parentId: '',
            persistent: false,
            source: PARSER_ASYNC_DEFAULT,
        },
        { emit: false }
    );
};
