import { clamp } from '../../mobbu/animation/utils/animationUtils';
import {
    getElementById,
    getElementByKeyAndParentId,
    removeAndDestroyById,
} from '../componentStore/action';
import {
    findNewElementIndex,
    getNewElement,
    getNewElement2,
    listKeyExist,
} from './utils';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * Add new children by key.
 */
export const addNewComponentToList = ({
    current = [],
    previous = [],
    containerList = document.createElement('div'),
    targetComponent = {},
    getChildren = () => {},
    key = '',
    id,
} = {}) => {
    /**
     * check if current and previous array has key.
     */
    const hasKey = listKeyExist({ current, previous, key });

    /**
     * 1- If hasKey get new element by diffrence form current to previous array.
     * 2 - If there is no key get the remaing items
     */
    const elementToAddObj = hasKey
        ? getNewElement2(current, previous, key)
        : current.filter((_element, i) => !previous[i]);

    const grouped2 = elementToAddObj.reduce(
        (previous, current) => {
            return !current.insert
                ? [...previous, [current]]
                : (() => {
                      previous[previous.length - 1].push(current);
                      return previous;
                  })();
        },
        [[]]
    );

    if (!grouped2?.[0].length) grouped2.shift();

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

    grouped2.forEach((item) => {
        const firstEl = item[0];
        const { insert } = firstEl;

        const elWhereInsert = insert
            ? getElementById({
                  id: childrenFiltered[0],
              })
            : getElementByKeyAndParentId({
                  key: item[0].item[key],
                  parentId: id,
              });

        const elToInsert = item
            .filter((element) => {
                return element.insert;
            })
            .map((pippo) => {
                return `<component data-component="${targetComponent}" data-key="${pippo.item[key]}"/>`;
            })
            .join('');

        if (insert) {
            elWhereInsert.insertAdjacentHTML(BEFORE, elToInsert);
        } else {
            elWhereInsert.insertAdjacentHTML(AFTER, elToInsert);
        }

        //
    });
    // console.log(elementToAddObj);
    // console.log(grouped2);
    // console.log(childrenFiltered);

    elementToRemoveByKey.forEach((component) => {
        const id = component.id;
        removeAndDestroyById({ id });
    });
};
