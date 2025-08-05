/**
 * Global behaviour for use query/placeholder webComponent to find component.
 *
 * @type {boolean}
 */
export const useQuery = false;

/**
 * Global behaviour for use query/placeholder webComponent to find slot.
 *
 * @type {boolean}
 */
export const useSlotQuery = false;

/**
 * ParentId group
 *
 * Global behaviour for use autetect parent id from web component
 *
 * True: find parent id from weakElementMap with a while loop on element.parentNode.
 *
 * False: parent element query all child and force id, with repeater id come as parameter of main parse function.
 *
 * @type {boolean}
 */
export const autoDetectParentId = true;

/**
 * ParentId group. enable only if autoDetectParentId === false
 *
 * Use custom tree-walker only to find child component. More performat in huge list of item respect webComponent
 *
 * @type {boolean}
 */
export const forceComponentChildQuery = true;

/**
 * Use query for add attribute to repeat child component. IF false use inmemory Map.
 *
 * @type {boolean}
 */
export const useRepeatWithoutSyncQuery = false;
