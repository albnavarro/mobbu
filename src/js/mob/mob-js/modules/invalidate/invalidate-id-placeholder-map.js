/**
 * Store parent invalidate by a webcomponent utils Key is invalidate id ScopeId is the component id that contains
 * invalidate when is initialized ( for nested invalidate performance check on destroy )
 *
 * @type {import('./type').InvalidateIdPlaceHolderMap}
 */

export const invalidateIdPlaceHolderMap = new Map();
