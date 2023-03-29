import { getUnivoqueId } from '../../../mobbu/animation/utils/animationUtils';
import { mainStore } from '../mainStore';

/**
 * Store props and return a unique indentifier
 */
export const createProps = (props) => {
    const id = getUnivoqueId();
    mainStore.set('propsToChildren', (prev) => {
        return [...prev, { [id]: props }];
    });

    return id;
};

/**
 * Return props by id
 */
export const getPropsFromParent = (id) => {
    const { propsToChildren } = mainStore.get();

    /**
     * Get props.
     */
    const props = propsToChildren.find((item) => {
        return item?.[id];
    });

    /**
     * Remove props
     */
    mainStore.set('propsToChildren', (prev) => {
        return prev.filter((item) => {
            return !(id in item);
        });
    });

    return props ? props[id] : {};
};
