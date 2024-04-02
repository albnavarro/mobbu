import { getFirstValidValueBack, propToSet } from './reduceFunction';

/**
 * @description
 * setPropFromAncestor
 * - Example when we come from goTo methods:
 *
 *  When we define the toValue we have to associate the right fromValue value
 *  ( ease methods need fromValue and toValue to calculate current value)
 *  we search back into the array until we found an active item with the same prop ( for example: rotate )
 *  we take the the first usable toValue and use we it as current fromValue
 *
 * @param  {Object} param
 * @param  {import("./type").sequencerRow[]} param.timeline
 * @param  {string} param.propToFind first ancestor prop <toValue> || <fromValue>
 * @param  {string[]} param.activeProp current props to update
 */
export const setPropFromAncestor = ({ timeline, propToFind, activeProp }) => {
    return timeline.map((item, index) => {
        const { values } = item;

        const newValues = values.map((valueItem) => {
            const { prop, active } = valueItem;

            if (!active || !activeProp.includes(prop)) return valueItem;

            /**
             * Goback into the array
             */
            const previousValidValue = getFirstValidValueBack(
                timeline,
                index,
                prop,
                propToFind
            );

            // If we doesn't found a value skip
            if (!previousValidValue) {
                return valueItem;
            }

            const newValueItem = {
                ...valueItem,
                [propToSet[propToFind].set]: previousValidValue,
            };

            return newValueItem;
        });

        return {
            ...item,
            values: newValues,
        };
    });
};
