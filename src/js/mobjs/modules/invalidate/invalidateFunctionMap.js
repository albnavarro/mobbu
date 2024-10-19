/**
 * @description
 * Store initialize invalidate function map.
 * Key is componentId
 *
 * @type {Map<string, Array<{invalidateId:string, fn: () => void, unsubscribe: (() => void)[]  }>>}
 */

export const invalidateFunctionMap = new Map();
