// @ts-check

/**
 * @type {import("./type").updateState}
 */
export const updateStateByKey = ({ key, map, update, set }) => {
    const state = map.get(key);
    if (!state) return;

    const stateUpdated = update({ key, map, state });
    set({ key, state: stateUpdated });
    return { ...stateUpdated };
};

/**
 * @type {import("./type").updateStateByProp}
 */
export const updateStateByProp = ({
    prop,
    value,
    exlcludeKey,
    map,
    update,
    set,
}) => {
    const items = [...map.entries()].filter(
        ([currentKey, currentValue]) =>
            currentValue?.[prop] === value && currentKey !== exlcludeKey
    );

    items.forEach(([key, currentValue]) => {
        const stateUpdated = update({ key, map, state: currentValue });
        set({ key, state: stateUpdated });
    });
};

/**
 * @type {import("./type").updateAll}
 */
export const updateAll = ({ map, update, set }) => {
    [...map.entries()].forEach(([key, state]) => {
        const stateUpdated = update({ key, map, state });
        set({ key, state: stateUpdated });
    });
};
