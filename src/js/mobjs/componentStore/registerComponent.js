// @ts-check

import { core } from '../../mobbu';
import { DEFAULT_CURRENT_REPEATER_STATE } from '../constant';
import { getFreezePropStatus } from './action/freeze';
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
 * @param {{current:Object, index: Number}} [ obj.currentRepeaterState ]
 * @param {Boolean} [ obj.isRepeater ]
 * @param {Array} [ obj.parentPropsWatcher ]
 * @param {Array} [ obj.freezedPros ]
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
    instanceName = '',
    props = {},
    state = {},
    key = '',
    currentRepeaterState = DEFAULT_CURRENT_REPEATER_STATE,
    isRepeater = false,
    parentPropsWatcher = [],
    destroy = () => {},
    freezedPros = [],
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
                currentRepeaterState,
                isRepeater,
                id,
                parentId: null,
                freezedPros,
                child: {},
                state: store,
            },
        ];
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
