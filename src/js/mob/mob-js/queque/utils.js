import { MobCore } from '../../mob-core';

/**
 * @returns {Promise<void>}
 */
export function awaitNextLoop() {
    return new Promise((resolve) => MobCore.useNextLoop(() => resolve()));
}
