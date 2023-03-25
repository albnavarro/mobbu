import { parseComponents } from '../componentParse';
import { updateChildrenOrder } from '../componentStore/action';
import { addNewComponentToList } from './addNewComponentToList';

// First try array of object.
export const updateChildren = async ({
    containerList,
    targetComponent = '',
    current = [],
    previous = [],
    getChildren,
    key = null,
    id,
}) => {
    /**
     * If there isn't new children return;
     */
    if (JSON.stringify(current) === JSON.stringify(previous)) return;

    /**
     * Execue function.
     */
    addNewComponentToList({
        current,
        previous,
        containerList,
        targetComponent,
        getChildren,
        key,
        id,
    });

    /**
     * Parse new component if there is ( added is executed )
     */
    await parseComponents({ element: containerList });

    updateChildrenOrder({
        id,
        component: targetComponent,
    });
};
