import { checkType } from '../../mobbu/store/storeType';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';
import { getElementById, setStateById } from '../componentStore/action';
import { updateChildren } from './updateChildren';

export const watchList = ({
    state,
    watch,
    containerList,
    updateState,
    props,
    targetComponent,
    getChildren,
    key,
    id,
}) => {
    return watch(state, async (current, previous) => {
        if (!checkType(Array, current)) return;

        const currentUnivoque = await updateChildren({
            state,
            containerList,
            targetComponent,
            current,
            previous,
            getChildren,
            key,
            props,
            id,
        });

        /**
         * Get all children by component type.
         */
        const children = getChildren(targetComponent);

        /**
         * Filter all children contained in containerList.
         */
        const childrenFiltered = [...children].filter((id) => {
            return isDescendant(containerList, getElementById({ id }));
        });

        [...childrenFiltered].forEach((id, index) => {
            updateState({
                current: currentUnivoque?.[index],
                setChildState: (prop, val) => setStateById(id, prop, val),
                index,
            });
        });
    });
};
