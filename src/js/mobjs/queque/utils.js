import { mobCore } from '../../mobCore';

/**
 * @description
 *
 * @returns {Promise<void>}
 */
export function awaitNextLoop() {
    return new Promise((resolve) => mobCore.useNextLoop(() => resolve()));
}
