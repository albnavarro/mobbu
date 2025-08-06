import { nonPersisitentComponentSet } from '../../../non-persisitent-set';

/**
 * @param {string} id
 * @returns {void}
 */
export const removeNonPersisitentComponent = (id) => {
    nonPersisitentComponentSet.delete(id);
};
