// @ts-check

import { queryAllFutureComponent } from './customSelector';

/**
 * @param {Object} obj
 * @param {Element} obj.element
 * @param {Array<Element>} obj.currentSelectors
 * @param {String|null} obj.runtimeId
 * @return {{componentToParse:Element, parseSourceArray:Array<Element> }}
 */
export const getParseSourceArray = ({
    element,
    currentSelectors,
    runtimeId,
}) => {
    if (currentSelectors.length > 0) {
        const componentToParse = currentSelectors[0];
        const parseSourceArray = currentSelectors.slice(1);

        return { componentToParse, parseSourceArray };
    } else {
        const query = [...queryAllFutureComponent(element, runtimeId)];
        const componentToParse = query?.[0];
        const parseSourceArray = query.slice(1);

        return { componentToParse, parseSourceArray };
    }
};
