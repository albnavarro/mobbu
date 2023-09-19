// @ts-check

import { selectAllFirstDepth } from './customSelector';

/**
 * @param {Object} obj
 * @param {Element} obj.element
 * @param {String} obj.selector
 * @param {Array<Element>} obj.currentSelectors
 * @return {{componentToParse:Element, parseSourceArray:Array<Element> }}
 */
export const getParseSourceArray = ({
    element,
    selector,
    currentSelectors,
}) => {
    if (currentSelectors.length > 0) {
        const componentToParse = currentSelectors[0];
        const parseSourceArray = currentSelectors.slice(1);

        return { componentToParse, parseSourceArray };
    } else {
        const query = [...selectAllFirstDepth(selector, element)];
        const componentToParse = query?.[0];
        const parseSourceArray = query.slice(1);

        return { componentToParse, parseSourceArray };
    }
};
