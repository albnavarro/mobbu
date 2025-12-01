import { updateAll, updateStateByKey, updateStateByProp } from './uilts';

export const mapTest = () => {
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
        updateStateByKey({
            key: 1,
            map: myMap,
            update: ({ state }) => {
                const { active } = state;

                return {
                    ...state,
                    active: !active,
                };
            },
            effect: ({ state }) => {
                console.log(state);
            },
        });

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
            effect: ({ state }) => {
                console.log(state);
            },
        });

        updateAll({
            map: myMap,
            update: ({ state }) => {
                return {
                    ...state,
                    value: 'test',
                };
            },
            effect: ({ state }) => {
                console.log(state);
            },
        });
    });
};
