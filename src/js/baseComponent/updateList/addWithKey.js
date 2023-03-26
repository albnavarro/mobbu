import {
    getElementById,
    getElementByKeyAndParentId,
    removeAndDestroyById,
} from '../componentStore/action';
import { getNewElement, mixPreviousAndCurrentData } from './utils';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * get partial list to add from chunked array of components.
 */
function getPArtialsComponentList({ targetComponent, element, key }) {
    return `
        <component data-component="${targetComponent}" data-key="${element.item[key]}"/>
    `;
}

/**
 * Add new children by key.
 */
export const addWithKey = ({
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = {},
    getChildren = () => {},
    key = '',
    id,
} = {}) => {
    /**
     * Get set of data with the right sequence of new list element mixinig old and news.
     */
    const elementToAddObj = mixPreviousAndCurrentData(current, previous, key);

    /**
     * Chunk the sequentially new element in group.
     * So then insert the block of new element.
     */
    const chunkedElementToAdd = elementToAddObj.reduce(
        (previous, current) => {
            return !current.shouldInsert
                ? [...previous, [current]]
                : (() => {
                      previous[previous.length - 1].push(current);
                      return previous;
                  })();
        },
        [[]]
    );

    /**
     * Remove first empty array if nothig changed at begging of data.
     */
    if (!chunkedElementToAdd?.[0].length) chunkedElementToAdd.shift();

    /**
     * The inverse above
     */
    const elementToRemoveObj = getNewElement(previous, current, key);
    const elementToRemoveByKey = elementToRemoveObj.map((item) => {
        const keyValue = item?.[key];
        return getElementByKeyAndParentId({ key: keyValue, parentId: id });
    });

    /**
     * Get all children by component type.
     */
    const children = getChildren(targetComponent);

    /**
     * Filter all children contained in containerList.
     */
    const childrenFiltered = [...children].filter((id) => {
        return isDescendant(containerList, getElementById({ id }));
    });

    chunkedElementToAdd.forEach((item) => {
        const firstEl = item[0];
        const { shouldInsert } = firstEl;

        const previousOrNextExistingElement = shouldInsert
            ? getElementById({
                  id: childrenFiltered[0],
              })
            : getElementByKeyAndParentId({
                  key: item[0].item[key],
                  parentId: id,
              });

        const componentToAppend = item
            .filter((element) => element.shouldInsert)
            .map((element) =>
                getPArtialsComponentList({ targetComponent, element, key })
            )
            .join('');

        const position = shouldInsert ? BEFORE : AFTER;
        previousOrNextExistingElement.insertAdjacentHTML(
            position,
            componentToAppend
        );
    });

    elementToRemoveByKey.forEach((component) => {
        const id = component.id;
        removeAndDestroyById({ id });
    });
};
