import { getElementById } from '../componentStore/action';
import { findNewElementIndex, getNewElement } from './utils';

/**
 * Add new children.
 * This method a component with a unique list of the same component
 */
export const addWithKey = ({
    current,
    previous,
    targetComponent,
    getChildren,
    key,
}) => {
    const newElement = getNewElement(current, previous, key);
    const newElementByIndex = findNewElementIndex(current, newElement, key);
    const children = getChildren(targetComponent);
    let previoursFactor = 0;

    newElementByIndex.forEach(({ index, item }) => {
        const elReferId =
            children?.[index - previoursFactor] ?? children.lenght;
        const el = getElementById({ id: elReferId });

        el.insertAdjacentHTML(
            'beforebegin',
            `<component data-component="${targetComponent}" data-key="${item[key]}"/>`
        );
        previoursFactor++;
    });

    //TODO riordinare il cHildrenarray del component padre coem il nuovo DOM.
    //Altrimenti il get children successivo in registerGenericElement
    //da un valore vecchio.
};
