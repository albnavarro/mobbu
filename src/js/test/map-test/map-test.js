import { updateAll, updateStateByKey, updateStateByProp } from './uilts';

export const stateTest = () => {
    /**
     * @type {import('./type').myMap}
     */
    const myMap = new Map([
        [0, { value: 'zero', active: false }],
        [1, { value: 'one', active: false }],
        [2, { value: 'two', active: false }],
        [3, { value: 'three', active: false }],
        [4, { value: 'three', active: false }],
        [5, { value: 'three', active: false }],
        [6, { value: 'three', active: false }],
    ]);

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
            set: ({ key, state }) => {
                myMap.set(key, state);
            },
        });
        console.log([...myMap], newState);

        updateStateByProp({
            prop: 'value',
            value: 'three',
            exclude: [4, 5],
            map: myMap,
            update: ({ state }) => {
                const { active } = state;

                return {
                    ...state,
                    active: !active,
                };
            },
            set: ({ key, state }) => {
                myMap.set(key, state);
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
            set: ({ key, state }) => {
                myMap.set(key, state);
            },
        });
        console.log([...myMap]);
    });
};
