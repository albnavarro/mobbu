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

/**
 * Delete all refs of props.
 * If slot in unsed and a propsFromStore is unused remain in store
 * So when active parser counter is equal 0 ( no parser is running )
 * remove all reference
 */
export const removeOrphansPropsFromParent = () => {
    mainStore.set('propsToChildren', []);
};
