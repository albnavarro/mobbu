/** @type {import('./type.d.ts').CommonData} */
let commonData;

export const getCommonData = () => commonData;

/**
 * Load common data.
 */
export const loadData = async () => {
    commonData = await fetch(`./data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.warn('Something went wrong.', error));
};
