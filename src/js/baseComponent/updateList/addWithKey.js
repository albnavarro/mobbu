import { clamp } from '../../mobbu/animation/utils/animationUtils';
import { getElementById } from '../componentStore/action';
import { findNewElementIndex, getNewElement } from './utils';
import { isDescendant } from '../../mobbu/utils/vanillaFunction';

const BEFORE = 'beforebegin';
const AFTER = 'afterend';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithKey = ({
    current,
    previous,
    containerList,
    targetComponent,
    getChildren,
    key,
}) => {
    const newElement = getNewElement(current, previous, key);
    const newElementByIndex = findNewElementIndex(current, newElement, key);
    const children = getChildren(targetComponent);
    const childrenFiltered = [...children].filter((id) => {
        return isDescendant(containerList, getElementById({ id }));
    });

    const testLast = [];
    let lastEl = null;

    newElementByIndex.forEach(({ index, item }, i) => {
        const newCompIndex = clamp([index - i], 0, childrenFiltered.length - 1);
        const elReferId = childrenFiltered?.[newCompIndex];
        const el = getElementById({ id: elReferId });

        const position =
            newCompIndex < childrenFiltered.length - 1 ? BEFORE : AFTER;

        if (position === AFTER) {
            testLast.push({ key: item[key] });
            lastEl = el;
            return;
        }

        el.insertAdjacentHTML(
            BEFORE,
            `<component data-component="${targetComponent}" data-key="${item[key]}"/>`
        );
    });

    const lasteRenderEl = testLast
        .map(({ key }) => {
            return `<component data-component="${targetComponent}" data-key="${key}"/>`;
        })
        .join('');

    lastEl.insertAdjacentHTML(AFTER, lasteRenderEl);
};
