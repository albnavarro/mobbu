let value = false;

/** @type{(newValue: boolean) => void} */
export const setRouteIsLoading = (newValue) => {
    value = newValue;
};

/** @type{() => boolean} */
export const getRouteIsLoading = () => value;
