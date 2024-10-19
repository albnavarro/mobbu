/**
 * @description
 * Store initialize function map.
 * Key is componentId
 *
 * @type {Map<string, Array<{repeatId:string, fn: () => void, unsubscribe: () => void}>>}
 */

export const repeatFunctionMap = new Map();
