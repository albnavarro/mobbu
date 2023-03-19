import { core } from '../mobbu';
import { getUnivoqueId } from '../mobbu/animation/utils/animationUtils';
import { setDestroyCallback } from './componentStore/action';

export const mainStore = core.createStore({
    propsToChildren: () => ({
        value: [],
        type: Array,
    }),
    onMountCallback: () => ({
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

export const addOnMoutCallback = ({ id, cb = () => {} }) => {
    mainStore.set('onMountCallback', (prev) => {
        return [...prev, { [id]: cb }];
    });
};

export const fireOnMountCallBack = ({ id, element }) => {
    const { onMountCallback } = mainStore.get();
    const currentItem = onMountCallback.find((item) => {
        return item?.[id];
    });

    // If callback is not used addOnMoutCallback is not fired.
    // So there is no callback ( undefined )
    const callback = currentItem?.[id];
    const destroyCallback = callback?.({ element });

    // Update destroy callback
    setDestroyCallback({ cb: destroyCallback, id });

    //Remove callback
    mainStore.set('onMountCallback', (prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });
};
