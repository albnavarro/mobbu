import { nonPersisitentComponentSet } from '../../../non-persisitent-set';
import { removeAndDestroyById } from '../remove-and-destroy-by-id';

/**
 * Destroy non persistent element.
 *
 * @returns {void}
 */
export const removeCancellableComponent = () => {
    for (const id of nonPersisitentComponentSet) {
        removeAndDestroyById({ id });
    }
};
