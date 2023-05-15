import { getRouteList } from '../mainStore/actions/routeList';
import { mainStore } from '../mainStore/mainStore';

export const getRouteModule = ({ url = '' }) => {
    const { index, pageNotFound } = mainStore.get();

    if (url === '') return index;
    return url in getRouteList() ? url : pageNotFound;
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
