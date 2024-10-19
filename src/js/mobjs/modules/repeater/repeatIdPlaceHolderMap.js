/**
 * @description
 * Store parent repeat by a webcomponent utils
 * Key is repeat id
 * ScopeId is the component id that contains repeat when is initialized
 * ( for nested repeater performance check on destroy )
 *
 *
 * @type {Map<string, {element: HTMLElement, initialized: boolean, scopeId: string|undefined }>}
 */

export const repeatIdPlaceHolderMap = new Map();
