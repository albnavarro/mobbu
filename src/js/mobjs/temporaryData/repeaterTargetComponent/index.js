//@ts-check

/**
 */
export const repeaterTargetComponentMap = new Map();

/**
 * @param {object} mainObject
 * @param {string} mainObject.repeatId
 * @param {string} mainObject.repeaterParentId
 * @param {string} mainObject.targetComponent
 *
 * @description
 * Add repeater target component.
 * When placeholder is created if has a repeaterId send information here.
 * So watchRepeater when react get the right target component.
 * All information is detected in constructor of userWebcomponent.
 *
 * - Information arrive from sync prop in repeater.
 * - Assume sync porp is used by the first depth compoenentr,
 *   so we detect the right component recative to repeater..
 * - RepeaterParentIs is used to clean map when parent is destroyed
 *
 * !Important.
 * A placeholder will become a component of the same type
 * ( eg. card-item will be a card-item )
 * But the component is recreated so id instance is different.
 * We can only get the type of component, not the specific instance id.
 */
export const addRepeatTargetComponent = ({
    repeatId,
    repeaterParentId,
    targetComponent,
}) => {
    if (repeaterTargetComponentMap.has(repeatId)) return;

    repeaterTargetComponentMap.set(repeatId, {
        repeatId,
        repeaterParentId,
        targetComponent,
    });
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Get targetComponent by repeaterId.
 */
export const getRepeaterComponentTarget = ({ id }) => {
    const item = repeaterTargetComponentMap.get(id);
    if (!item) return;

    return item?.targetComponent;
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Remove targetComponent reference from Map when parent is destroyed.
 */
export const removeRepeaterComponentTargetByParentId = ({ id }) => {
    for (const [key, value] of repeaterTargetComponentMap) {
        const { repeaterParentId } = value;

        if (repeaterParentId === id) {
            repeaterTargetComponentMap.delete(key);
        }
    }
};
