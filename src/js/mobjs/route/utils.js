// @ts-check

import { getRouteList } from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';

/**
 * @param {Object} obj
 * @param {string} obj.url
 * @returns {String}
 *
 * @description
 * Validate url, in not exixst return pageNotFound.
 */
export const getRouteModule = ({ url = '' }) => {
    const { index, pageNotFound } = mainStore.get();

    if (url === '') return index;
    return url in getRouteList() ? url : pageNotFound;
};

/**
 * @param {Object} obj
 * @param {String} obj.name - Component tag name.
 * @param {Function} obj.component - Component function.
 * @param {Array<String>} [ obj.exportState ] - State editable from outside.
 * @param {Boolean} [ obj.asyncLoading ] - Fire onMount callback a separate nextTick ( after a single animatioFrame ).
   `default = false`.
 * @param {Boolean} [ obj.asyncCreation ] - Create element in a separate nextTick ( after a single animatioFrame ).
    - If is setted to `false` use a request animation frame to apply class/style inside onMount function ( to have css trasition working ).
   `default = true`.
 * @param {Boolean} [ obj.scoped ] - Fire onMount callback immediatly, normally onMount is fired at the end of current parse.
   This means that if `scoped:true` every querySelector fired inside onMount function is scoped inside current component, but has no effect to child component.
   `default = false`.
 * @param {import('../../mobMotion').MobbuStoreType} [ obj.state ] - Component state
 * @returns Object<string:{componentFunction:function,componentParams:Object}>
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponent = ({
    name = '',
    component = () => {},
    exportState = [],
    asyncCreation = true,
    asyncLoading = false,
    scoped = false,
    state = {},
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                asyncCreation,
                asyncLoading,
                scoped,
                state,
            },
        },
    };
};
