/**
 * From data object return an object filtered by props in activeData
 *
 * @param {object} params
 * @param {Record<string, number | (() => number)>} params.data
 * @param {Record<string, number | (() => number)>} params.filterBy
 */
export const filterActiveProps = ({ data, filterBy }) => {
    return Object.entries(data)
        .map((item) => {
            const [prop, val] = item;
            const isValidValue = Object.hasOwn(filterBy, prop);
            return { data: { [prop]: val }, active: isValidValue };
        })
        .filter(({ active }) => active)
        .map(({ data }) => data)
        .reduce((p, c) => {
            return { ...p, ...c };
        }, {});
};
