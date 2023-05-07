import { IS_COMPONENT } from '../../utils';
import { componentStore } from '../store';
import { removeChildFromChildrenArray } from '../utils';

/**
 * Remove component to store and destry it.
 */
export const removeAndDestroyById = ({ id = null }) => {
    if (!id) return;

    const { instances } = componentStore.get();

    const { component: componentName, element } =
        instances.find(({ id: currentId }) => {
            return currentId === id;
        }) || {};

    if (!element) return;

    /**
     * Destroy all component nested.
     */
    const componentNested = element.querySelectorAll(`[${IS_COMPONENT}]`);
    [...componentNested].forEach((component) =>
        removeAndDestroyById({ id: component.id })
    );

    /**
     * -------------
     * Remove id from parent child array.
     * -------------
     */

    /**
     * get parent instance filtered by componentName
     */
    const parentInstance = instances.find(({ child }) => {
        const parentComponentArray = child?.[componentName] ?? [];
        return parentComponentArray.includes(id);
    });

    /**
     * get parentId, and remove id from parent
     */
    const parentId = parentInstance?.id ?? null;
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.map((item) => {
            const { id: currentId } = item;

            return currentId === parentId
                ? {
                      ...item,
                      ...{
                          child: {
                              ...item.child,
                              ...removeChildFromChildrenArray({
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

    /**
     * Remove item From store.
     */
    componentStore.set('instances', (prevInstances) => {
        return prevInstances.filter((current) => {
            const { state, destroy, element, id: currentId } = current;
            if (currentId === id) {
                destroy();
                state.destroy();
                element?.remove();
            }

            // Assign is if existe a parent component and current parentId is null
            return id !== currentId;
        });
    });
};
