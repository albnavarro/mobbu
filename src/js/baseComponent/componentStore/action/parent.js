import { IS_COMPONENT } from '../../utils';
import { componentStore } from '../store';
import { updateChildrenArray } from '../utils';

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
        return prevInstances.map((item) => {
            const { id: currentId } = item;

            return currentId === parentId
                ? {
                      ...item,
                      ...{
                          child: {
                              ...item.child,
                              ...updateChildrenArray({
                                  currentChild: item.child,
                                  id,
                                  componentName,
                              }),
                          },
                      },
                  }
                : item;
        });
    });
};

/**
 * Set a reference to parent component id for each component.
 */
export const setParentsComponent = () => {
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.map((item) => {
            const { element, parentId } = item;
            const parent = element?.parentNode?.closest(`[${IS_COMPONENT}]`);

            // Assign is if existe a parent component and current parentId is null
            return parent && !parentId
                ? { ...item, ...{ parentId: parent.id } }
                : item;
        });
    });
};
