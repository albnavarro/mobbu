import { IS_COMPONENT } from '../utils';
import { componentStore } from './store';

/**
 * Update element root from generic to real after conversion.
 */
export const setElementById = ({ id = null, newElement }) => {
    if (!id) return null;

    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return id === currentId
                ? [...previous, { ...current, ...{ element: newElement } }]
                : [...previous, current];
        }, []);
    });
};

/**
 * Get element by id
 */
export const getElementById = ({ id = null }) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementById failed no id found`);
        return null;
    }

    return element;
};

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
export const setStateById = (id, prop, value) => {
    if (!id && !prop && !value) return;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => currentId === id);

    const state = instance?.state;
    if (!state) {
        console.warn(`setStateById failed no id found on prop: ${prop}`);
        return null;
    }

    state.set(prop, value);
};

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

/**
 * get parent id By id
 */
export const getParentIdById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const parentId = instance?.parentId;
    if (!parentId) {
        console.warn(`getParentIdById failed no id found`);
        return null;
    }

    return parentId;
};

/**
 * Get children id.
 */
export const getChildIdById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const child = instance?.child;
    if (!child) {
        console.warn(`getChildIdById failed no id found`);
        return null;
    }

    return child;
};

/**
 * Remove with no reference to DOM.
 */
export const removeGhostComponent = () => {};

/**
 * Remove component to store.
 */
export const removeComponentFromStore = () => {
    // Run destroy function
    // Destroy store
    // Remove parentId reference where used
    // Remove item from global store
};

/**
 * Remove component to store.
 */
export const removeCancellableComponentFromStore = () => {
    // Call removeComponentFromStore for each component cacellable
};

/**
 * Set a reference to parent component id for each component.
 */
export const setParentsComponent = () => {
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { element, parentId } = current;
            const parent = element.parentNode.closest(`[${IS_COMPONENT}]`);

            // Assign is if existe a parent component and current parentId is null
            return parent && !parentId
                ? [...previous, { ...current, ...{ parentId: parent.id } }]
                : [...previous, current];
        }, []);
    });
};

/**
 * Update child id.
 * From current component id get parentID and then add to parent child id
 */
export const addSelfToParentComponent = ({ id = null }) => {
    if (!id) return;

    // Get current element.
    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    // Get parentId of current component.
    const parentId = instance?.parentId;
    if (!parentId) return;

    // Add component Id to parent element.
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return currentId === parentId
                ? [
                      ...previous,
                      { ...current, ...{ child: [...current.child, id] } },
                  ]
                : [...previous, current];
        }, []);
    });
};

/**
 * Update deestroy call back by id.
 */
export const setDestroyCallback = ({ cb = () => {}, id = null }) => {
    if (!id) return;

    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return id === currentId
                ? [...previous, { ...current, ...{ destroy: cb } }]
                : [...previous, current];
        }, []);
    });
};
