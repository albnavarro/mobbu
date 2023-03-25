import { clamp } from '../../mobbu/animation/utils/animationUtils';
import { getElementById } from '../componentStore/action';
import { findNewElementIndex, getNewElement } from './utils';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

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
} = {}) => {
    /**
     * Get new element by diffrence form current to previous array.
     */
    const newElement = getNewElement(current, previous, key);

    /**
     * Add index position of new element to add form current array.
     */
    const newElementByIndex = findNewElementIndex(current, newElement, key);

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
                newCompIndex < childrenFiltered.length - 1 ? BEFORE : AFTER;

            /**
             * Store the new component to add after.
             */
            if (position === AFTER) {
                return {
                    lastChild: el,
                    components: [...previous.components, { key: item[key] }],
                };
            }

            /**
             * The index of component is inside the last list ( current DOM )
             * So add before the current element.
             */
            el.insertAdjacentHTML(
                BEFORE,
                `<component data-component="${targetComponent}" data-key="${item[key]}"/>`
            );

            return previous;
        },
        { lastChild: null, components: [] }
    );

    /**
     * Add the component stored at the end.
     */
    const { lastChild, components } = componentToAddAfter;
    const lasteRenderEl = components
        .map(({ key }) => {
            return `<component data-component="${targetComponent}" data-key="${key}"/>`;
        })
        .join('');

    lastChild.insertAdjacentHTML(AFTER, lasteRenderEl);
};
