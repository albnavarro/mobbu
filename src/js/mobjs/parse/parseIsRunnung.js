let value = false;

/** @type{(newValue: boolean) => void} */
export const setParseIsRunning = (newValue) => {
    value = newValue;
};

/** @type{() => boolean} */
export const getParseIsRunning = () => value;
