// @ts-check

import { core } from '../../mobbu';
import { IS_CANCELLABLE } from '../constant';
import { componentStore } from './store';
import { addPropsToState } from './utils';

/**
 * @param {Object} obj
 * @param {HTMLElement} obj.placeholderElement
 * @param {HTMLElement} obj.component
 * @param {string} obj.instanceName
 * @param {Object} obj.props
 * @param {Object} obj.state
 * @param {string} obj.key
 * @param {Array} obj.parentPropsWatcher
 * @param {function} obj.destroy
 * @param {string} obj.id
 * @param {string} obj.componentName
 *
 * @return {{
    getState: function():object,
    setState: function(string, any, boolean):void,
    emit: function(string):void,
    emitAsync: function(string):Promise,
    computed: function(string, Array.<String>, function(any,any):any):void,
    watch: function(string, function(any,any,(boolean|object))):Function
 * }}
 *
 *
 * @description
 * Add component to store.
 */
export const addComponentToStore = ({
    placeholderElement = document.createElement('div'),
    component = document.createElement('div'),
    instanceName = '',
    props = {},
    state = {},
    key = '',
    parentPropsWatcher = [],
    destroy = () => {},
    id = '',
    componentName = '',
}) => {
    const store = core.createStore(state);
    addPropsToState({ props, store });

    componentStore.set('instances', (/** @type {Array} */ prev) => {
        return [
            ...prev,
            {
                element: placeholderElement,
                component: componentName,
                instanceName,
                destroy,
                parentPropsWatcher,
                key,
                id,
                parentId: null,
                child: {},
                cancellable: component.hasAttribute(IS_CANCELLABLE),
                state: store,
            },
        ];
    });

    return {
        getState: () => store.get(),
        setState: (prop = '', value = {}, fire = true) =>
            store.set(prop, value, fire),
        emit: (prop = '') => store.emit(prop),
        emitAsync: async (prop = '') => await store.emitAsync(prop),
        computed: (prop = '', keys = [], fn = () => {}) =>
            store.computed(prop, keys, fn),
        watch: (prop = '', cb = () => {}) => store.watch(prop, cb),
    };
};
