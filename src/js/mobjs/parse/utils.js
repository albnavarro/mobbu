// @ts-check

import { queryAllFutureComponent } from '../query/queryAllFutureComponent';
import { getFirstUserChildPlaceHolder } from '../modules/userComponent';
import { useQuery } from './useQuery';

/**
 * @type {number}
 */
let currentIterationCounter = 0;

/**
 * @return {void}
 */
export const incrementCurrentIterationCounter = () => {
    currentIterationCounter += 1;
};

/**
 * @return {number}
 */
export const getCurrentIterationCounter = () => currentIterationCounter;

/**
 * @return {void}
 */
export const resetCurrentIterationCounter = () => {
    currentIterationCounter = 0;
};

/**
 * @param {object} obj
 * @param {Element} obj.element
 * @param {Array<import("../webComponent/type").UserComponent>} obj.currentSelectors
 * @return {{componentToParse:import("../webComponent/type").UserComponent, parseSourceArray:Array<import("../webComponent/type").UserComponent> }}
 */
export const getParseSourceArray = ({ element, currentSelectors }) => {
    if (currentSelectors.length > 0) {
        const componentToParse = currentSelectors[0];
        const parseSourceArray = currentSelectors.slice(1);

        return { componentToParse, parseSourceArray };
    } else {
        const query = useQuery
            ? [...queryAllFutureComponent(element)]
            : getFirstUserChildPlaceHolder(element);

        const componentToParse = query?.[0];
        const parseSourceArray = query.slice(1);

        return { componentToParse, parseSourceArray };
    }
};
