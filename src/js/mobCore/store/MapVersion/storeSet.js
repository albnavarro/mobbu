// @ts-check

/**
 * @param {import("./type").storeSetAction} params
 * @returns {import("./type").storeMapValue}
 */
export const storeSetAction = ({
    state,
    propsId,
    value,
    fireCallback = true,
    clone = false,
}) => {
    console.log(state, propsId, value, fireCallback, clone);

    return state;
};
