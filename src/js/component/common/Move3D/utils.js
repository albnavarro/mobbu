//@ts-check

import { offset, outerHeight, outerWidth } from '../../../mob/mobCore/utils';
import { MobJs } from '../../../mob/mobjs';

/**
 * @import {UseMethodArrayByName} from '../../../mob/mobjs/type'
 */

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

/**  @type{(arg0: {childrenId: string }) => ((arg0: {delta:number, factor:number}) => void)[]} */
export const getChildrenMethod = ({ childrenId }) => {
    /** @type  {UseMethodArrayByName<import('./move3DItem/type').Move3DItem>} */
    const methods = MobJs.useMethodArrayByName(childrenId);

    return methods.map((method) => {
        return (/** @type{{delta:number, factor:number}} */ props) =>
            method?.move?.(props);
    });
};
