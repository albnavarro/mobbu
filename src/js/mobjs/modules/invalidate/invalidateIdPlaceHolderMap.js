/**
 * @description
 * Store parent invalidate by a webcomponent utils
 * Key is invalidate id
 * ScopeId is the component id that contains invalidate when is initialized
 * ( for nested invalidate performance check on destroy )
 *
 * @type {Map<string, {element: HTMLElement, initialized: boolean, scopeId: string|undefined }>}
 */

export const invalidateIdPlaceHolderMap = new Map();
