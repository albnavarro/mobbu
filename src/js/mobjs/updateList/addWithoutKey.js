import { removeAndDestroyById } from '../componentStore/action/removeAndDestroy';
import { componentStore } from '../componentStore/store';
import { createProps } from '../mainStore/actions/props';
import { IS_RUNTIME } from '../utils';
import { getChildrenInsideElement } from './utils';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithoutKey = ({
    current,
    previous,
    containerList,
    targetComponent,
    getChildren,
    runtimeId,
    props = null,
}) => {
    const currentLenght = current.length;
    const previousLenght = previous.length;
    const diff = currentLenght - previousLenght;

    /**
     * Add
     */
    if (diff > 0) {
        /**
         * Create palcehodler component
         */
        const elementToAdd = [...Array(diff).keys()]
            .map((_item, index) => {
                const currentProps = createProps(
                    props({
                        current: current?.[index + previousLenght],
                        index: index + previousLenght,
                    })
                );
                return /* HTML */ `
                    <component
                        data-props=${currentProps}
                        ${IS_RUNTIME}="${runtimeId}"
                        data-component="${targetComponent}"
                    >
                    </component>
                `;
            })
            .reverse();

        /**
         * Filter children inside containerList
         */
        const childrenFilteredToAdd = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: containerList,
        });

        const lastChildren =
            childrenFilteredToAdd[childrenFilteredToAdd.length - 1];

        /**
         * Query last child and append new children.
         * TODO Usare un metodo dello sotre per prender il DOM element dall' id ?
         */
        elementToAdd.forEach((element) => {
            const lastNode = containerList.querySelector(`#${lastChildren}`);

            if (lastNode) {
                lastNode.insertAdjacentHTML('afterend', element);
                return;
            }

            containerList.insertAdjacentHTML('afterbegin', element);
        });
    }

    /**
     * Remove
     */

    /**
     * Filter children inside containerList
     */
    const childrenFilteredToRemove = getChildrenInsideElement({
        component: targetComponent,
        getChildren,
        element: containerList,
    });

    const childrenToRemoveByKey = childrenFilteredToRemove.filter(
        (_child, i) => {
            return i >= current.length;
        }
    );

    childrenToRemoveByKey.forEach((childId) => {
        removeAndDestroyById({ id: childId });
    });

    return current;
};

/**
 * Remove cancellable component to store.
 */
export const removeCancellableComponentFromStore = () => {
    const { instances } = componentStore.get();
    const cancellableComponents = instances.filter(({ cancellable }) => {
        return cancellable;
    });

    cancellableComponents.forEach(({ id }) => {
        removeAndDestroyById({ id });
    });
};

/**
 * Remove orphan omponent from store.
 */
export const removeOrphanComponent = () => {
    const { instances } = componentStore.get();

    const orphans = instances.filter(
        ({ element }) => !document.body.contains(element)
    );

    orphans.forEach(({ id }) => removeAndDestroyById({ id }));
};

/**
 * Update deestroy call back by id.
 */
export const setDestroyCallback = ({ cb = () => {}, id = null }) => {
    if (!id) return;

    componentStore.set('instances', (prevInstances) => {
        return prevInstances.map((item) => {
            const { id: currentId } = item;

            return id === currentId ? { ...item, ...{ destroy: cb } } : item;
        });
    });
};
