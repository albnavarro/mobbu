import { core } from '../../mobbu';
import { IS_CANCELLABLE } from '../utils';
import { getParentIdById } from './action';
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
}) => {
    const store = core.createStore(state);
    componentStore.set('instances', (prev) => {
        return [
            ...prev,
            {
                element,
                component,
                props,
                destroy,
                id,
                parentId: null,
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
        getParentId: () => getParentIdById(id),
    };
};
