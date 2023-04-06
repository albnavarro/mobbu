import { componentStore } from '../store';

/**
 * Get element by Dom instance
 */
export const getPropsById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const props = instance?.props;
    if (!props) {
        console.warn(`getPropsById failed no id found`);
        return null;
    }

    return props;
};
