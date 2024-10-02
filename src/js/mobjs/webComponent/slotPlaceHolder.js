/**
 * @type {Set<import('./type').SlotComponent>}
 */
export const slotPlaceholder = new Set();

/**
 * @param {import('./type').SlotComponent} slot
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
 * @param {HTMLElement|import('./type').UserComponent} params.element
 * @returns {import('./type').SlotComponent|undefined}
 */
export const getUnamedPlaceholderSlot = ({ element }) => {
    return [...slotPlaceholder].find((slot) => {
        const hasSlot = !slot?.getSlotName?.() && element.contains(slot);
        if (hasSlot) slotPlaceholder.delete(slot);

        return hasSlot;
    });
};

/**
 * @param {object} params
 * @param {string} params.name
 * @param {HTMLElement|import('./type').UserComponent} params.element
 * @returns {import('./type').SlotComponent}
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
 * @returns {import('./type').SlotComponent[]}
 */
export const getAllSlot = () => {
    return [...slotPlaceholder];
};

/**
 * @returns {number}
 *
 * @description
 */
export const getSlotPlaceholderSize = () => {
    return slotPlaceholder.size;
};
