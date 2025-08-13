import { MobCore } from '../../mob-core';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_ASYNC_PARSER,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './constant';

/**
 * @import {MobStoreParams} from '../../mob-core/store/type';
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
            persistent: () => ({
                value: false,
                type: Boolean,
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
        MAIN_STORE_ASYNC_PARSER,
        {
            element: document.createElement('div'),
            parentId: '',
            persistent: false,
        },
        { emit: false }
    );
};
