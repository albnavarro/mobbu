import { clamp } from '../../mobbu/animation/utils/animationUtils';
import {
    getElementById,
    getElementByKeyAndParentId,
    removeAndDestroyById,
} from '../componentStore/action';
import { findNewElementIndex, getNewElement, listKeyExist } from './utils';
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
        ? getNewElement(current, previous, key)
        : current.filter((_element, i) => !previous[i]);

    /**
     * 1- If hasKey add index position of new element to add form current array.
     * 2- If there is no key get the future key index.
     */
    const newElementByIndex = hasKey
        ? findNewElementIndex(current, elementToAddObj, key)
        : elementToAddObj.map((item, i) => {
              return { index: previous.length + i, item };
          });

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

    const lastChildFilteredId = childrenFiltered?.[childrenFiltered.length - 1];
    const lastChildFiltered = getElementById({ id: lastChildFilteredId });

    /**
     * Add new placeholder component if index is < last list ( current DOM ) or store to add at the end.
     */
    const componentToAddAfter = newElementByIndex.reduce(
        (previous, { index, item }, i) => {
            /**
             * Calmp index from 0 to last list lenght ( current DOM ).
             */
            const newCompIndex = clamp(
                [index - i],
                0,
                childrenFiltered.length - 1
            );

            /**
             * Get current child element.
             */
            const childId = childrenFiltered?.[newCompIndex];
            const el = getElementById({ id: childId });

            /**
             * Check if insert the new component before or athe the end che current element.
             */
            const position =
                newCompIndex < childrenFiltered.length - 1 && hasKey
                    ? BEFORE
                    : AFTER;

            /**
             * Store the new component to add after.
             */
            if (position === AFTER) {
                return [...previous, { key: item?.[key] }];
            }

            /**
             * The index of component is inside the last list ( current DOM )
             * So add before the current element.
             */
            el.insertAdjacentHTML(
                BEFORE,
                `<component data-component="${targetComponent}" data-key="${item?.[key]}"/>`
            );

            return previous;
        },
        []
    );

    /**
     * Add the component stored at the end.
     */
    const lasteRenderEl = componentToAddAfter
        .map(({ key }) => {
            return `<component data-component="${targetComponent}" data-key="${
                key ?? null
            }"/>`;
        })
        .join('');

    lastChildFiltered.insertAdjacentHTML(AFTER, lasteRenderEl);

    elementToRemoveByKey.forEach((component) => {
        const id = component.id;
        removeAndDestroyById({ id });
    });
};
