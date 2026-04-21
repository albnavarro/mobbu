/**
 * Track tag component in string format
 *
 * @type {Set<string>}
 */
const availableComponentTag = new Set();

/**
 * @param {string} tag
 */
export const updateAvailableComponentTag = (tag) => {
    availableComponentTag.add(tag.toLowerCase());
};

/**
 * Check if tag is a component
 *
 * @param {string} tag
 */
export const tagShouldBeComponent = (tag) =>
    availableComponentTag.has(tag.toLowerCase());
