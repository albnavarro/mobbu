// @ts-check

import { mobCore } from '../../mobCore';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { getParseIsRunning } from '../parse/parseIsRunnung';
import { getRouteIsLoading } from '../route/routeIsLoading';
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
    const store = mobCore.createStore(state);
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

    /**
     * Avoid multiple state mutation of same prop in same javascript loop.
     */
    const propsQueque = new Set();

    return {
        getState: () => store.get(),
        setState: (prop = '', value = {}, fire = true) => {
            const isFreezed = getFreezePropStatus({ id, prop });
            const propsIsRunning = propsQueque.has(prop);
            const routeIsLoading = getRouteIsLoading();
            const parseIsRunnung = getParseIsRunning();

            /**
             * Use one mutation X prop in single javascript loop.
             * Only outside route change or parse dom component.
             */
            if (
                isFreezed ||
                (propsIsRunning && !routeIsLoading && !parseIsRunnung)
            )
                return;

            propsQueque.add(prop);
            store.set(prop, value, fire);

            mobCore.useNextLoop(() => {
                propsQueque.delete(prop);
            });
        },
        updateState: (
            prop = '',
            updateFunction = () => {},
            fire = true,
            clone = false
        ) => {
            const isFreezed = getFreezePropStatus({ id, prop });
            const propsIsRunning = propsQueque.has(prop);
            const routeIsLoading = getRouteIsLoading();
            const parseIsRunnung = getParseIsRunning();

            /**
             * Use one mutation X prop in single javascript loop.
             * Only outside route change or parse dom component.
             */
            if (
                isFreezed ||
                (propsIsRunning && !routeIsLoading && !parseIsRunnung)
            )
                return;

            propsQueque.add(prop);
            store.update(prop, updateFunction, fire, clone);

            mobCore.useNextLoop(() => {
                propsQueque.delete(prop);
            });
        },
        emit: (prop = '') => store.emit(prop),
        emitAsync: async (prop = '') => await store.emitAsync(prop),
        computed: (
            prop = '',
            /** @type {string[]} */ keys = [],
            fn = () => {}
        ) => store.computed(prop, keys, fn),
        watch: (prop = '', cb = () => {}) => store.watch(prop, cb),
        debug: () => store.debug(),
    };
};
