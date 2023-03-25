import { IS_COMPONENT } from '../utils';
import { componentStore } from './store';
import { removeChildFromChildrenArray, updateChildrenArray } from './utils';

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
 * Get element by id
 */
export const getElementByKeyAndParentId = ({ key = null, parentId = null }) => {
    if (!key) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(
        ({ key: currentKey, parentId: currentParentId }) =>
            currentKey === key && currentParentId === parentId
    );

    const element = instance?.element;
    if (!element) {
        console.warn(`getElementByKey failed no id found`);
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
export const getChildrenIdByName = ({ id, component }) => {
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

    return child?.[component] ?? [];
};

/**
 * Update children order of a component
 */
export const updateChildrenOrder = ({ id, component }) => {
    /*
     * Get element
     */
    const element = getElementById({ id });

    /**
     * Get id af all component inside
     */
    const components = element.querySelectorAll('[data-iscomponent]');
    const componentsIdNow = [...components].map((item) => item.id);

    /**
     * Filter for the component we are looking for
     */
    const componentsIdFiltered = componentsIdNow.filter((currentId) => {
        return getComponentNameById(currentId) === component;
    });

    /**
     * Update children store od element with the DOM actual order.
     */
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return currentId === id
                ? [
                      ...previous,
                      {
                          ...current,
                          ...{
                              child: {
                                  ...current.child,
                                  ...{ [component]: componentsIdFiltered },
                              },
                          },
                      },
                  ]
                : [...previous, current];
        }, []);
    });
};

/**
 * get component name By id
 */
export const getComponentNameById = (id) => {
    if (!id) return null;

    const { instances } = componentStore.get();
    const instance = instances.find(({ id: currentId }) => {
        return currentId === id;
    });

    const componentName = instance?.component;
    if (!componentName) {
        console.warn(`getComponentNameById failed no id found`);
        return null;
    }

    return componentName;
};

// export const updateChildrenArray
/**
 * Remove with no reference to DOM.
 */
export const removeGhostComponent = () => {};

/**
 * Remove component to store and destry it.
 */
export const removeAndDestroyById = ({ id = null }) => {
    if (!id) return;

    const { instances } = componentStore.get();
    const { destroy, component: componentName } = instances.find(
        ({ id: currentId }) => {
            return currentId === id;
        }
    );

    /**
     * Fire destroy function.
     */
    destroy?.();

    /**
     * Remove id from parent child array.
     */
    const parentInstance = instances.find(({ child }) => {
        const parentComponentArray = child?.[componentName] ?? [];
        return parentComponentArray.includes(id);
    });

    /**
     * get parent Id, and remove id from parent
     */
    const parentId = parentInstance?.id ?? null;
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return currentId === parentId
                ? [
                      ...previous,
                      {
                          ...current,
                          ...{
                              child: {
                                  ...current.child,
                                  ...removeChildFromChildrenArray({
                                      currentChild: current.child,
                                      id,
                                      componentName,
                                  }),
                              },
                          },
                      },
                  ]
                : [...previous, current];
        }, []);
    });

    /**
     * Remove item From store.
     */
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.filter((current) => {
            const { destroy, element, id: currentId } = current;
            if (currentId === id) {
                element?.remove();
                destroy?.();
            }

            // Assign is if existe a parent component and current parentId is null
            return id !== currentId;
        });
    });
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
            const parent = element?.parentNode?.closest(`[${IS_COMPONENT}]`);

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
    const componentName = instance?.component;
    if (!parentId) return;

    // Add component Id to parent element.
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.reduce((previous, current) => {
            const { id: currentId } = current;

            return currentId === parentId
                ? [
                      ...previous,
                      {
                          ...current,
                          ...{
                              child: {
                                  ...current.child,
                                  ...updateChildrenArray({
                                      currentChild: current.child,
                                      id,
                                      componentName,
                                  }),
                              },
                          },
                      },
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
