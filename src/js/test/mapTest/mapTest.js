// @ts-check

import { updateAll, updateStateByKey, updateStateByProp } from './uilts';

export const stateTest = () => {
    /**
     * @type {import("./type").myMap}
     */
    const myMap = new Map();
    myMap.set(0, { value: 'zero', active: false });
    myMap.set(1, { value: 'one', active: false });
    myMap.set(2, { value: 'two', active: false });
    myMap.set(3, { value: 'three', active: false });
    myMap.set(4, { value: 'three', active: false });
    myMap.set(5, { value: 'three', active: false });
    myMap.set(6, { value: 'three', active: false });

    document.body.addEventListener('click', () => {
        const newState = updateStateByKey({
            key: 1,
            map: myMap,
            update: ({ state }) => {
                const { active } = state;

                return {
                    ...state,
                    active: !active,
                };
            },
        });
        console.log([...myMap], newState);

        updateStateByProp({
            prop: 'value',
            value: 'three',
            exlcludeKey: 5,
            map: myMap,
            update: ({ state }) => {
                const { active } = state;

                return {
                    ...state,
                    active: !active,
                };
            },
        });
        console.log([...myMap]);

        updateAll({
            map: myMap,
            update: ({ state }) => {
                return {
                    ...state,
                    value: 'test',
                };
            },
        });
        console.log([...myMap]);
    });
};
