import { MobCore } from '../../mob-core';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { setRepeaterComponentChildren } from '../modules/repeater/action/set-repeat-component-children';
import { getFreezePropStatus } from './action/freeze';
import { addNonPersisitentComponent } from './action/remove-and-destroy/cancellable-component/add-persisitent-component';
import { getExportableState } from './action/state/check-if-state-is-exportable';
import { componentMap } from './component-map';
import { addIdToInstanceMap } from './instance-map';
import { addPropsToState, propStrignWarining } from './utils';

/**
 * Add component to store.
 *
 * @param {import('./type').ComponentStoreInput} params
 * @returns {import('./type').ComponentStoreReturn}
 */
export const addComponentToStore = ({
    element,
    instanceName = '',
    props = {},
    state = {},
    bindStore,
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

    if (bindStore) {
        store.bindStore(bindStore);
    }

    if (!persistent) {
        addNonPersisitentComponent(id);
    }

    /**
     * Save component id in repeater map, if is inside repeater. fast find component in repeater.
     */
    if (componentRepeatId && componentRepeatId.length > 0) {
        setRepeaterComponentChildren({
            componentId: id,
            repeatId: componentRepeatId,
        });
    }

    if (instanceName && instanceName.length > 0) {
        addIdToInstanceMap({ instanceName, id });
    }

    const exportableState = getExportableState({ componentName });
    const exportableStateSet = new Set(exportableState);

    /**
     * Proxi is readOnly if state is a props.
     */
    store.setProxiReadOnlyProp(exportableState);

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

            /**
             * Prop is readonly, skip in scope component.
             */
            const isProp = exportableStateSet.has(prop);
            if (isProp)
                propStrignWarining({
                    prop,
                    componentName,
                    action: 'updateState',
                });

            if (isFreezed || isProp) return;

            store.set(prop, value, { emit: emit ?? true });
        },
        updateState: (
            prop = '',
            updateFunction = () => {},
            { emit = true, clone = false } = {}
        ) => {
            const isFreezed = getFreezePropStatus({ id, prop });

            /**
             * Prop is readonly, skip in scope component.
             */
            const isProp = exportableStateSet.has(prop);
            if (isProp)
                propStrignWarining({
                    prop,
                    componentName,
                    action: 'updateState',
                });

            if (isFreezed || isProp) return;

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
        ) => {
            /**
             * Prop is readonly, skip in scope component.
             */
            const isProp = exportableStateSet.has(prop);
            if (isProp) {
                propStrignWarining({
                    prop,
                    componentName,
                    action: 'computed',
                });
                return;
            }

            return store.computed(prop, fn, keys);
        },
        watch: (
            prop = '',
            cb = () => {},
            { wait = false, immediate = false } = {}
        ) =>
            store.watch(prop, cb, {
                wait: wait ?? false,
                immediate: immediate ?? false,
            }),
        debug: () => store.debug(),
    };
};
