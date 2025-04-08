import { MobCore } from '../../mob-core';

/**
 * @description
 *
 * @returns {Promise<void>}
 */
export function awaitNextLoop() {
    return new Promise((resolve) => MobCore.useNextLoop(() => resolve()));
}
