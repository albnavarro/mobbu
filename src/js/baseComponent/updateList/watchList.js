import { checkType } from '../../mobbu/store/storeType';
import { setStateById } from '../componentStore/action';
import { updateChildren } from './updateChildren';

export const watchList = ({
    state,
    targetState,
    watch,
    containerList,
    targetComponent,
    callback,
    getChildren,
    key,
    id,
}) => {
    return watch(state, async (current, previous) => {
        if (!checkType(Array, current)) return;

        await updateChildren({
            containerList,
            targetComponent,
            current,
            previous,
            getChildren,
            key,
            id,
        });

        getChildren(targetComponent).forEach((id, i) => {
            //If component is in list
            if (!current[i]) return;

            setStateById(
                id,
                targetState,
                callback({
                    current: current[i],
                    previous: previous[i],
                    i,
                })
            );
        });
    });
};
