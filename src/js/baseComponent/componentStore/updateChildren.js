// First try array of object.
export const updateChildren = async ({
    element,
    componentName = '',
    current = [],
    previous = [],
}) => {
    console.log(`current:`, current);
    console.log(`previous:`, previous);

    return new Promise((resolve) => {
        // setTimeout(() => {
        resolve();
        // }, 500);
    });
};
