// @ts-check

import { componentMap } from '../../store';
import { removeAndDestroyById } from './removeAndDestroyById';

/**
 * @returns { void }
 *
 * @description
 * Remove non persistent component from store.
 * ( all component without element defined in wrapper ).
 */

export const removeCancellableComponent = () => {
    const cancellableComponents = [...componentMap.values()].filter(
        ({ persistent }) => !persistent
    );

    cancellableComponents.forEach(({ id }) => removeAndDestroyById({ id }));
};
