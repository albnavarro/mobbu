//@ts-check

import { offset, outerHeight, outerWidth } from '../../../mobCore/utils';
import { useMethodArrayByName } from '../../../mobjs';

/**
 * @type {(arg0: {element: HTMLElement}) => {height: number, width:number, offSetLeft: number, offSetTop: number }}
 */
export const getMove3DDimension = ({ element }) => {
    return {
        height: outerHeight(element),
        width: outerWidth(element),
        offSetLeft: offset(element).left,
        offSetTop: offset(element).top,
    };
};

/**  @type{(arg0: {childrenId: string }) => ((arg0: {delta:number, limit:number}) => void)[]} */
export const getChildrenMethod = ({ childrenId }) => {
    const methods = useMethodArrayByName(childrenId);

    return methods.map((method) => {
        return (/** @type{{delta:number, limit:number}} */ props) =>
            method?.move?.(props);
    });
};
