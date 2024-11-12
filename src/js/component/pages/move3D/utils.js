//@ts-check

import { offset, outerHeight, outerWidth } from '../../../mobCore/utils';
import { useMethodByName } from '../../../mobjs';

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

/** @type{(data: import('./type').Move3DChildren[]) => string[] } */
const reduceChildrenId = (data) => {
    const initialData = [];

    return data.reduce((previous, current) => {
        const childrensId =
            current.children.length > 0
                ? [current.props.id, ...reduceChildrenId(current.children)]
                : [current.props.id];

        return [...previous, ...childrensId];
    }, initialData);
};

/**  @type{(arg0: {childrenId: string, data:import('./type').Move3DChildren[] }) => ((arg0: {delta:number, limit:number}) => void)[]} */
export const getChildrenMethod = ({ childrenId, data }) => {
    const ids = reduceChildrenId(data);

    return ids.map((id) => {
        const method = useMethodByName(`${childrenId}-${id}`)?.move;

        return (/** @type{{delta:number, limit:number}} */ props) =>
            method?.(props);
    });
};
