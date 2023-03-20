import { core } from '../../mobbu';
import { IS_CANCELLABLE } from '../utils';
import { getChildrenIdByName, getParentIdById, watchById } from './action';
import { componentStore } from './store';

/**
 * Add component to store.
 */
export const registerComponent = ({
    element = {},
    component = {},
    props = {},
    state = {},
    destroy = null,
    id = null,
    componentName = '',
}) => {
    const store = core.createStore(state);
    componentStore.set('instances', (prev) => {
        return [
            ...prev,
            {
                element,
                component: componentName,
                props,
                destroy,
                id,
                parentId: null,
                child: {},
                cancellable: component.hasAttribute(IS_CANCELLABLE),
                state: store,
            },
        ];
    });

    return {
        props,
        getState: () => store.get(),
        setState: (prop, value) => store.set(prop, value),
        watch: (prop, cb) => store.watch(prop, cb),
        watchParent: (prop, cb) => watchById(getParentIdById(id), prop, cb),
        getChildren: (component) => getChildrenIdByName({ id, component }),
        getParentId: () => getParentIdById(id),
    };
};
