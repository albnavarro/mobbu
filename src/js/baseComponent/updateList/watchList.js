import { checkType } from '../../mobbu/store/storeType';
import { setStateById } from '../componentStore/action';
import { updateChildren } from './updateChildren';
import { getChildrenInsideElement } from './utils';

export const watchList = ({
    state,
    watch,
    containerList,
    props,
    updateState,
    beforeUpdate,
    afterUpdate,
    targetComponent,
    getChildren,
    key,
    id,
}) => {
    return watch(state, async (current, previous) => {
        if (!checkType(Array, current)) return;

        beforeUpdate({
            container: containerList,
            childrenId: getChildrenInsideElement({
                component: targetComponent,
                getChildren,
                element: containerList,
            }),
        });

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
         * Filter children inside containerList
         */
        const childrenFiltered = getChildrenInsideElement({
            component: targetComponent,
            getChildren,
            element: containerList,
        });

        [...childrenFiltered].forEach((id, index) => {
            updateState({
                current: currentUnivoque?.[index],
                setChildState: (prop, val) => setStateById(id, prop, val),
                index,
            });
        });

        /**
         * Fire onComplete next tick;
         */
        setTimeout(() => {
            afterUpdate({
                container: containerList,
                childrenId: childrenFiltered,
            });
        });
    });
};
