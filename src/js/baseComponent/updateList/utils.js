export const arrayDifferenceTest = () => {
    const prev = [
        { label: 'pluto' },
        { label: 'pippo' },
        { label: 'paperino' },
    ];
    const current = [
        { label: 'pluto' },
        { label: 'nuovo1' },
        { label: 'pippo' },
        { label: 'nuovo2' },
        { label: 'nuovo3' },
        { label: 'paperino' },
        { label: 'nuovo4' },
    ];

    function getNewElement(current, previous, key) {
        return current.filter((el) => {
            const value = el?.[key];
            return !previous.find((a) => a?.[key] === value);
        });
    }

    function findNewElementIndex(current, newElement, key) {
        return newElement.reduce((prev, curr) => {
            const keyVal = curr[key];
            const index = current.findIndex((el) => el?.[key] === keyVal);
            return [...prev, { index: index, item: curr }];
        }, []);
    }

    const newElement = getNewElement(current, prev, 'label');
    const newIndex = findNewElementIndex(current, newElement, 'label');
    console.log(newIndex);
};
