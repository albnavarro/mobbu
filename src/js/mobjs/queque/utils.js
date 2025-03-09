import { MobCore } from '../../mobCore';

/**
 * @description
 *
 * @returns {Promise<void>}
 */
export function awaitNextLoop() {
    return new Promise((resolve) => MobCore.useNextLoop(() => resolve()));
}
