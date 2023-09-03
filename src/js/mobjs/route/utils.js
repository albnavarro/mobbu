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
 * @param {Array<String>} obj.exportState - State editable from outside.
 * @param {Boolean} obj.asyncLoading - Fire onMount callback in a separate animation Frame.
 * @param {import('../../mobMotion').MobbuStoreType} obj.state - Component state
 * @returns Object<string:{componentFunction:function,componentParams:Object}>
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponentDefinition = ({
    name = '',
    component = () => {},
    exportState = [],
    asyncLoading = false,
    state = {},
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                exportState,
                asyncLoading,
                state,
            },
        },
    };
};
