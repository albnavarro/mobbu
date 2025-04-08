// @ts-check

import { MobCore } from '../../mob-core';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { getFreezePropStatus } from './action/freeze';
import { componentMap } from './store';
import { addPropsToState } from './utils';

/**
 * @param {import('./type').ComponentStoreInput} params
 * @returns {import('./type').ComponentStoreReturn}
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
    methods = {},
    key = '',
    currentRepeaterState = DEFAULT_CURRENT_REPEATER_STATE,
    repeaterInnerWrap,
    repeatPropBind = '',
    componentRepeatId = '',
    parentPropsWatcher = [() => {}],
    refs = {},
    destroy = () => {},
    freezedPros = [],
    persistent = false,
    child = {},
    parentId = '',
    id = '',
    componentName = '',
}) => {
    const store = MobCore.createStore(state);
    addPropsToState({ props, store });

    componentMap.set(id, {
        element,
        componentName,
        instanceName,
        destroy,
        parentPropsWatcher,
        refs,
        methods,
        key,
        currentRepeaterState,
        repeaterInnerWrap,
        repeatPropBind,
        componentRepeatId,
        persistent,
        id,
        parentId,
        freezedPros,
        child,
        state: store,
    });

    return {
        getState: () => store.get(),
        setState: (prop = '', value = {}, { emit = true } = {}) => {
            const isFreezed = getFreezePropStatus({ id, prop });
            if (isFreezed) return;

            store.set(prop, value, { emit: emit ?? true });
        },
        updateState: (
            prop = '',
            updateFunction = () => {},
            { emit = true, clone = false } = {}
        ) => {
            const isFreezed = getFreezePropStatus({ id, prop });
            if (isFreezed) return;

            store.update(prop, updateFunction, {
                emit: emit ?? true,
                clone: clone ?? false,
            });
        },
        getProxi: () => store.getProxi(),
        emit: (prop = '') => store.emit(prop),
        emitAsync: async (prop = '') => await store.emitAsync(prop),
        computed: (
            prop = '',
            fn = () => {},
            /** @type {string[]} */ keys = []
        ) => store.computed(prop, fn, keys),
        watch: (
            prop = '',
            cb = () => {},
            { wait = false, immediate = false } = {}
        ) =>
            store.watch(prop, cb, {
                wait: wait ?? false,
                immediate: immediate ?? false,
            }),
        bindStore: (value) => {
            store.bindStore(value);
        },
        debug: () => store.debug(),
    };
};
