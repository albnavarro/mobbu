import { getFirstValidValueBack, propToSet } from './reduceFunction';

/**
 * @description
 * setPropFromAncestor
 * Add/Update toValue/fromValue (propTofind) in case a new row of type goTo/goFrom is inserted.
 * Update only active item in row.
 * After reorder the timeline (start/priority) update each value with the nearest previous value.
 *
 * goFromTo has both toValue and fromValue, so skip
 *
 * @param  {Object} param
 * @param  {import("./type").sequencerRow[]} param.timeline
 * @param  {string[]} param.activeProp current props to update
 */
export const setPropFromAncestor = ({ timeline, activeProp }) => {
    /**
     * For each row.
     */
    return timeline.map((item, index) => {
        const { values, propToFind } = item;

        /**
         * Update each active prop used in current row.
         */
        const newValues = values.map((valueItem) => {
            const { prop, active } = valueItem;

            if (
                !active ||
                !activeProp.includes(prop) ||
                !propToFind ||
                propToFind.length === 0
            )
                return valueItem;

            /**
             * Goback into the array and find ancestor value.
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
