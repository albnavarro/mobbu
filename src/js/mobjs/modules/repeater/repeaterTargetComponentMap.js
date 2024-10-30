//@ts-check

/**
 * repeaterParentId: scope component id.
 * targetComponent: component name of  component inside repeater, use for debug mode.
 *
 * Use this map for debug ad for check if reepater has component children ( targetComponent.length )
 * when clean is true delete content if there is some active component, this is the fastest way.
 *
 * @type {Map<string, {repeatId:string,repeaterParentId:string,targetComponent:string[]}>}
 */
export const repeaterTargetComponentMap = new Map();
