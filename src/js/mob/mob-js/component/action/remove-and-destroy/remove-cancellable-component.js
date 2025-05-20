import { componentMap } from '../../store';
import { removeAndDestroyById } from './remove-and-destroy-by-id';

/**
 * Remove non persistent component from store. ( all component without element defined in wrapper ).
 *
 * @returns {void}
 */
export const removeCancellableComponent = () => {
    const cancellableComponents = [...componentMap.values()].filter(
        ({ persistent }) => !persistent
    );

    cancellableComponents.forEach(({ id }) => removeAndDestroyById({ id }));
};
