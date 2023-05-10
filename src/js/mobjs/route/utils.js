import { getRouteList } from '../mainStore/actions/routeList';

export const getRouteModule = ({ url = '' }) => {
    if (url === '') return 'home';
    return url in getRouteList() ? url : 'pageNotFound';
};

export const createComponentDefinition = ({
    name = '',
    component = {},
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
