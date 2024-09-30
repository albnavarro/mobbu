/**
 * @type {Set<import('./type').slotComponent>}
 */
export const slotPlaceholder = new Set();

/**
 * @param {import('./type').slotComponent} slot
 * @returns {void}
 */
export const addSlotPlaceholder = (slot) => {
    slotPlaceholder.add(slot);
};

/**
 * @returns {void}
 *
 * @description
 * Clean array after convertToRealElement
 */
export const clearSlotPlaceHolder = () => {
    slotPlaceholder.clear();
};

/**
 * @param {object} params
 * @param {HTMLElement|import('./type').userComponent} params.element
 * @returns {import('./type').slotComponent[]}
 */
export const getUnamedPlaceholderSlot = ({ element }) => {
    return [...slotPlaceholder].filter((slot) => {
        const hasSlot = !slot?.getSlotName?.() && element.contains(slot);
        if (hasSlot) slotPlaceholder.delete(slot);

        return hasSlot;
    });
};

/**
 * @param {object} params
 * @param {string} params.name
 * @param {HTMLElement|import('./type').userComponent} params.element
 * @returns {import('./type').slotComponent}
 */
export const getSlotByName = ({ name, element }) => {
    return [...slotPlaceholder].find((slot) => {
        const hasSlot =
            slot?.getSlotName?.() === name && element.contains(slot);
        if (hasSlot) slotPlaceholder.delete(slot);

        return hasSlot;
    });
};

/**
 * @returns {number}
 *
 * @description
 */
export const getSlotPlaceholderSize = () => {
    return slotPlaceholder.size;
};
