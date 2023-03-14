import { core } from '../../../mobbu';
import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';

export const mainStore = core.createStore({
    propsToChildren: () => ({
        value: [],
        type: Array,
    }),
});

export const createProps = (props) => {
    const id = getUnivoqueId();
    mainStore.set('propsToChildren', (prev) => {
        return [...prev, { [id]: props }];
    });

    return id;
};

export const getPropsFromParent = (id) => {
    const { propsToChildren } = mainStore.get();

    // get props
    const props = propsToChildren.find((item) => {
        return item?.[id];
    });

    // Remove props
    mainStore.set('propsToChildren', (prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });

    return props ? props[id] : {};
};
