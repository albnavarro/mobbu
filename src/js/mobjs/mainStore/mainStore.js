// @ts-check

import { mobCore } from '../../mobCore';
import { mobStore } from '../../mobCore/store/mobStore';
import {
    MAIN_STORE_ACTIVE_PARAMS,
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
    MAIN_STORE_REPEATER_PARSER_ROOT,
    MAIN_STORE_ROUTE_IS_LOADING,
} from './constant';

/**
 * @type {import('../../mobCore/store/type').mobStore<import('./type').MainStore>}
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
    [MAIN_STORE_REPEATER_PARSER_ROOT]: {
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

// const { pippo } = mainStore.get();
// const x = mainStore.getProp('repeaterParserRoot');
// mainStore.set('pippo', 2);
// mainStore.quickSetProp('pippo', 2);
// mainStore.watch('pippo', (current, previous, status) => {
//     //
// });
mainStore.computed(
    'pippo',
    ['beforeRouteChange', 'beforeRouteChange'],
    ({ routeIsLoading, beforeRouteChange }) => {
        console.log(routeIsLoading, beforeRouteChange);
        return 2;
    }
);
// mainStore.emitAsync('activeRoute')
