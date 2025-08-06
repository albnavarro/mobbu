import { nonPersisitentComponentSet } from '../../../non-persisitent-set';

/**
 * @param {string} id
 * @returns {void}
 */
export const addNonPersisitentComponent = (id) => {
    nonPersisitentComponentSet.add(id);
};
