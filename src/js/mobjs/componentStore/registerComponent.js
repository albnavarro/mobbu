// @ts-check

import { mobCore } from '../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { getFreezePropStatus } from './action/freeze';
import { componentMap } from './store';
import { addPropsToState } from './utils';

/**
 * @param {Object} obj
 *
 * @return {{
    getState: function():object,
    setState: function(string, any, boolean):void,
    emit: function(string):void,
    emitAsync: function(string):Promise,
    computed: function(string, Array.<String>, function()):void,
    watch: function(string, function()):Function
 * }}
 *
 *
 * @description
 * Add component to store.
 */
export const addComponentToStore = ({
    componentParsed,
    instanceName = '',
    props = {},
    state = {},
    key = '',
    currentRepeaterState = DEFAULT_CURRENT_REPEATER_STATE,
    isRepeater = false,
    parentPropsWatcher = [],
    destroy = () => {},
    freezedPros = [],
    isCancellable = true,
    child = [],
    parentId = '',
    id = '',
    componentName = '',
}) => {
    const store = mobCore.createStore(state);
    addPropsToState({ props, store });

    componentMap.set(id, {
        element: componentParsed,
        component: componentName,
        instanceName,
        destroy,
        parentPropsWatcher,
        key,
        currentRepeaterState,
        isRepeater,
        isCancellable,
        id,
        parentId,
        freezedPros,
        child,
        state: store,
    });

    return {
        getState: () => store.get(),
        setState: (prop = '', value = {}, fire = true) => {
            const isFreezed = getFreezePropStatus({ id, prop });
            if (isFreezed) return;

            store.set(prop, value, fire);
        },
        emit: (prop = '') => store.emit(prop),
        emitAsync: async (prop = '') => await store.emitAsync(prop),
        computed: (prop = '', keys = [], fn = () => {}) =>
            store.computed(prop, keys, fn),
        watch: (prop = '', cb = () => {}) => store.watch(prop, cb),
    };
};
