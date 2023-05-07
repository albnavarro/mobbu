import { componentStore } from '../store';

/**
 * Get state
 */
export const getStateById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`getStateById failed no id found`);
        return null;
    }

    return state.get();
};

/**
 * Set state
 */
export const setStateById = (id, prop, value, fire = true) => {
    if (!id && !prop && !value) return;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.set(prop, value, fire);
};
