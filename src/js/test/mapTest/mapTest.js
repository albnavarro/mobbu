// @ts-check

/**
 * @type {import("./type").updateState}
 */
const updateState = ({ key, map, action }) => {
    const state = map.get(key);
    if (!state) return;

    const stateUpdated = action({ key, map, state });
    map.set(key, stateUpdated);
    return stateUpdated;
};

/**
 * @type {import("./type").updateStateByProp}
 */
const updateStateByProp = ({ prop, value, map, action }) => {
    const items = [...map.entries()].filter(
        ([, currentValue]) => currentValue?.[prop] === value
    );

    items.forEach(([key, currentValue]) => {
        map.set(key, action({ key, map, state: currentValue }));
    });
};

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
        const newState = updateState({
            key: 1,
            map: myMap,
            action: ({ state }) => {
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
            map: myMap,
            action: ({ state }) => {
                const { active } = state;

                return {
                    ...state,
                    active: !active,
                };
            },
        });
        console.log([...myMap]);
    });
};
