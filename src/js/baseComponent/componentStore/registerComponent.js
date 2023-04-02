import { core } from '../../mobbu';
import { IS_CANCELLABLE } from '../utils';
import { componentStore } from './store';

/**
 * Add component to store.
 */
export const registerComponent = ({
    placeholderElement = {},
    component = {},
    props = {},
    state = {},
    key = null,
    destroy = null,
    id = null,
    componentName = '',
}) => {
    const store = core.createStore(state);
    componentStore.set('instances', (prev) => {
        return [
            ...prev,
            {
                element: placeholderElement,
                component: componentName,
                props,
                destroy,
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
        setState: (prop, value, fire = true) => store.set(prop, value, fire),
        emit: (prop) => store.emit(prop),
        computed: (prop, keys, fn) => store.computed(prop, keys, fn),
        watch: (prop, cb) => store.watch(prop, cb),
    };
};
