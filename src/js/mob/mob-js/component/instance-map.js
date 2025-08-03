/**
 * @type {Map<string, string[]>}
 */
export const instanceMap = new Map();

/**
 * @param {object} params
 * @param {string} params.instanceName
 * @param {string} params.id
 */
export const addIdToInstanceMap = ({ instanceName, id }) => {
    const idCollection = instanceMap.get(instanceName) ?? [];
    instanceMap.set(instanceName, [...idCollection, id]);
};

/**
 * @param {object} params
 * @param {string} params.instanceName
 * @param {string} params.id
 * @returns {void}
 */
export const removeIdFromInstanceMap = ({ instanceName, id }) => {
    const idCollection = instanceMap.get(instanceName);
    if (!idCollection) return;

    const idCollectionFiltered = idCollection.filter((item) => item !== id);

    if (idCollectionFiltered.length === 0) {
        instanceMap.delete(instanceName);
    }

    if (idCollectionFiltered.length > 0) {
        instanceMap.set(instanceName, idCollectionFiltered);
    }
};

/**
 * @param {object} params
 * @param {string} params.instanceName
 * @returns {string[]}
 */
export const getIdsFromInstanceMap = ({ instanceName }) => {
    return instanceMap.get(instanceName) ?? [];
};
