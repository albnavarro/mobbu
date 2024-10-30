import { repeaterTargetComponentMap } from '../repeaterTargetComponentMap';

/**
 * @param {object} mainObject
 * @param {string} mainObject.repeatId
 * @param {string} mainObject.repeaterParentId
 * @param {string} mainObject.targetComponent
 *
 * @description
 * Add repeater target component.
 * When placeholder is created if has a repeaterId send information here.
 */
export const addRepeatTargetComponent = ({
    repeatId,
    repeaterParentId,
    targetComponent,
}) => {
    if (repeaterTargetComponentMap.has(repeatId)) {
        const item = repeaterTargetComponentMap.get(repeatId);
        const { targetComponent: previousTargetComponent } = item;

        const targetComponentParsed =
            targetComponent?.length === 0
                ? [targetComponent]
                : [...previousTargetComponent, targetComponent];

        repeaterTargetComponentMap.set(repeatId, {
            ...item,
            targetComponent: targetComponentParsed,
        });

        return;
    }

    repeaterTargetComponentMap.set(repeatId, {
        repeatId,
        repeaterParentId,
        targetComponent: [targetComponent],
    });
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @return {string[]}
 *
 *
 * @description
 * Get targetComponent array by repeaterId.
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
