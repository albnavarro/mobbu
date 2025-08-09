/**
 * Store initialize invalidate function map. Key is componentId
 *
 * Invalidate as a different unsubscribe type respect repeat.
 *
 * Since the observe property receives an array of states and not just one, it needs an array of unsubscribes.
 *
 * @type {import('./type').InvalidateFunctionMap}
 */

export const invalidateFunctionMap = new Map();
