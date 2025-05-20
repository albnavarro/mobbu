import { queryAllFutureComponent } from '../query/query-all-future-component';
import { getFirstUserChildPlaceHolder } from '../modules/user-component';
import { useQuery } from './use-query';

/**
 * @type {number}
 */
let currentIterationCounter = 0;

/**
 * @returns {void}
 */
export const incrementCurrentIterationCounter = () => {
    currentIterationCounter += 1;
};

/**
 * @returns {number}
 */
export const getCurrentIterationCounter = () => currentIterationCounter;

/**
 * @returns {void}
 */
export const resetCurrentIterationCounter = () => {
    currentIterationCounter = 0;
};

/**
 * @param {object} obj
 * @param {Element} obj.element
 * @param {import('../web-component/type').UserComponent[]} obj.currentSelectors
 * @returns {{
 *     componentToParse: import('../web-component/type').UserComponent;
 *     parseSourceArray: import('../web-component/type').UserComponent[];
 * }}
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
