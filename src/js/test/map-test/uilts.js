/**
 * @type {import('./type').updateState}
 */
export const updateStateByKey = ({ key, map, update, effect }) => {
    const state = map.get(key);
    if (!state) return;

    const stateUpdated = update({ key, map, state });
    map.set(key, stateUpdated);
    effect?.({ key, state: stateUpdated });

    return { ...stateUpdated };
};

/**
 * @type {import('./type').updateStateByProp}
 */
export const updateStateByProp = ({
    prop,
    value,
    exclude,
    map,
    update,
    effect,
}) => {
    const items = [...map.entries()].filter(([currentKey, currentValue]) => {
        const keyToExclude = exclude ?? [];
        const keyIsValid = !keyToExclude.includes(currentKey);
        return currentValue?.[prop] === value && keyIsValid;
    });

    for (const [key, currentValue] of items) {
        const stateUpdated = update({ key, map, state: currentValue });
        map.set(key, stateUpdated);
        effect?.({ key, state: stateUpdated });
    }
};

/**
 * @type {import('./type').updateAll}
 */
export const updateAll = ({ map, update, effect }) => {
    for (const [key, state] of map.entries()) {
        const stateUpdated = update({ key, map, state });
        map.set(key, stateUpdated);
        effect?.({ key, state: stateUpdated });
    }
};
