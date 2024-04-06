// @ts-check

/**
 * @type {import("./type").updateState}
 */
export const updateStateByKey = ({ key, map, update }) => {
    const state = map.get(key);
    if (!state) return;

    const stateUpdated = update({ key, map, state });
    map.set(key, stateUpdated);
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
}) => {
    const items = [...map.entries()].filter(
        ([currentKey, currentValue]) =>
            currentValue?.[prop] === value && currentKey !== exlcludeKey
    );

    items.forEach(([key, currentValue]) => {
        map.set(key, update({ key, map, state: currentValue }));
    });
};

/**
 * @type {import("./type").updateAll}
 */
export const updateAll = ({ map, update }) => {
    [...map.entries()].forEach(([key, state]) => {
        map.set(key, update({ key, map, state }));
    });
};
