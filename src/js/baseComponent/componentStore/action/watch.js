import { componentStore } from '../store';

/**
 * Watch state
 */
export const watchById = (id, prop, cb) => {
    if (!id && !prop && !cb) return;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`watchById failed no id found on prop: ${prop}`);
        return null;
    }

    return state.watch(prop, cb);
};
