/**
 * Clock like math
 */
export const clockModule = () => {
    const size = 60;
    const amount = 122;
    const result = (amount % size) + (amount < 0 ? size : 0);
    const result2 = ((amount % size) + size) % size;
    console.log(result, result2);
};
