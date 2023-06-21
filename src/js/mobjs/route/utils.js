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
 * @param {String} obj.name
 * @param {Function} obj.component
 * @param {Object} obj.props
 * @param {Object} obj.state
 * @returns {{ string:{componentFunction:function,props:Object,state:Object} }}
 *
 * @description
 * Format component definition in object key: value.
 * name, function, props, state
 */
export const createComponentDefinition = ({
    name = '',
    component = () => {},
    props = {},
    state = {},
}) => {
    return {
        [name]: {
            componentFunction: component,
            componentParams: {
                props,
                state,
            },
        },
    };
};
