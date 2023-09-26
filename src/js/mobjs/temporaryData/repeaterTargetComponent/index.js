//@ts-check

/**
 */
export const repeaterTargetComponent = new Map();

/**
 * @param { Object } mainObject
 * @param { String } mainObject.repeatId
 * @param { String } mainObject.repepeateParentId
 * @param { String } mainObject.targetComponent
 *
 * @description
 * Add new repeater id and props.
 * Add target component.
 * When placeholder is created if has a repeaterId send information here.
 * So watchRepeater when react get the right target component.
 * All information is detected in contructor of userWebcomponent.
 */
export const addRepeatTargetComponent = ({
    repeatId,
    repepeateParentId,
    targetComponent,
}) => {
    if (repeaterTargetComponent.has(repeatId)) return;

    repeaterTargetComponent.set(repeatId, {
        repeatId,
        repepeateParentId,
        targetComponent,
    });
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Get targetComponent by repeaterId.
 */
export const getRepeaterComponentTarget = ({ id }) => {
    const item = repeaterTargetComponent.get(id);
    if (!item) return;

    return item?.targetComponent;
};

/**
 * @param {Object} obj
 * @param {string} obj.id
 * @return void
 *
 *
 * @description
 * Remove targetComponent reference from Map when parent is destroyed.
 */
export const removeRepeaterComponentTargetByParentId = ({ id }) => {
    for (const [key, value] of repeaterTargetComponent) {
        const { repepeateParentId } = value;

        if (repepeateParentId === id) {
            repeaterTargetComponent.delete(key);
        }
    }
};
