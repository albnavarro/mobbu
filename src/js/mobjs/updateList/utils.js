import { isDescendant } from '../../mobbu/utils/vanillaFunction';
import { getElementById } from '../componentStore/action/element';

/**
 * Get new element of currrent array compare to previous.
 */
export const getNewElement = (current, previous, key) => {
    return current.filter((el) => {
        const value = el?.[key];
        return !previous.find((a) => a?.[key] === value);
    });
};

/**
 * Get new element index.
 */
export const findNewElementIndex = (current, newElement, key) => {
    return newElement.reduce((prev, curr) => {
        const keyVal = curr[key];
        const index = current.findIndex((el) => el?.[key] === keyVal);
        return [...prev, { index: index, item: curr }];
    }, []);
};

/**
 * Mix previous and current data to manage the insertion of new component in right position.
 */
export const mixPreviousAndCurrentData = (current, previous, key) => {
    return current.map((el, index) => {
        const value = el?.[key];
        const isNewElement = !previous.find((a) => a?.[key] === value);
        return isNewElement
            ? { isNewElement: true, key: el?.[key], index }
            : { isNewElement: false, key: el?.[key], index };
    });
};

/**
 * Check if all new item in lsit has key.
 */
const arrayhaskey = ({ arr, key }) => {
    return arr.every((item) => {
        return [key] in item;
    });
};

/**
 * Check if current and previous array has key.
 */
export const listKeyExist = ({ current, previous, key }) => {
    return (
        arrayhaskey({ arr: current, key }) &&
        arrayhaskey({ arr: previous, key })
    );
};

/**
 * get univique array by key.
 */
export const getUnivoqueByKey = ({ data = [], key = '' }) => {
    return data.filter(
        (v, i, a) => a.findIndex((v2) => v2?.[key] === v?.[key]) === i
    );
};

/**
 * get children of component inside a element
 */
export const getChildrenInsideElement = ({
    component,
    getChildren,
    element,
}) => {
    const children = getChildren(component);
    if (!children) return [];

    return [...children].filter((id) => {
        return isDescendant(element, getElementById({ id }));
    });
};
