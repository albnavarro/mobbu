// @ts-check

import { mobCore } from '../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { getFreezePropStatus } from './action/freeze';
import { componentMap } from './store';
import { addPropsToState } from './utils';

/**
 * @param {import('./type').componentStoreInputTypes} params
 * @returns {import('./type').componentStoreReturnType}
 *
 *
 * @description
 * Add component to store.
 */
export const addComponentToStore = ({
    element,
    instanceName = '',
    props = {},
    state = {},
    key = '',
    currentRepeaterState = DEFAULT_CURRENT_REPEATER_STATE,
    isRepeaterFirstChildNode = false,
    repeatPropBind = '',
    repeaterContextId = '',
    parentPropsWatcher = [() => {}],
    destroy = () => {},
    freezedPros = [],
    isCancellable = true,
    invalidateId = [],
    child = {},
    parentId = '',
    id = '',
    componentName = '',
}) => {
    const store = mobCore.createStore(state);
    addPropsToState({ props, store });

    componentMap.set(id, {
        element,
        componentName,
        instanceName,
        destroy,
        parentPropsWatcher,
        key,
        currentRepeaterState,
        isRepeaterFirstChildNode,
        repeatPropBind,
        repeaterContextId,
        isCancellable,
        invalidateId,
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
