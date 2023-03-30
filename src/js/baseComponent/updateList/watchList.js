import { checkType } from '../../mobbu/store/storeType';
import { setStateById } from '../componentStore/action';
import { updateChildren } from './updateChildren';

export const watchList = ({
    state,
    watch,
    containerList,
    updateState,
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
            id,
        });

        getChildren(targetComponent).forEach((id, index) => {
            //If component is in list
            if (!currentUnivoque?.[index]) return;

            updateState({
                current: currentUnivoque[index],
                previous: previous[index],
                setChildState: (prop, val) => setStateById(id, prop, val),
                index,
            });
        });
    });
};
