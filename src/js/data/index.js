let commonData = {};
let legendData = {};
export const getCommonData = () => commonData;
export const getLegendData = () => legendData;

/**
 * Load common data.
 */
export const loadData = async () => {
    commonData = await fetch(`../data/common.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));

    legendData = await fetch(`../data/legend.json`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((err) => console.warn('Something went wrong.', err));
};
