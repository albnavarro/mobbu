/** @type {import('./type').MathCommonAnimation} */
export const mathCircle = ({ targets } = {}) => {
    if (!targets)
        return {
            play: () => {},
            resume: () => {},
            stop: () => {},
            destroy: () => {},
        };

    console.log(targets);

    return {
        play: () => {},
        resume: () => {},
        stop: () => {},
        destroy: () => {},
    };
};
