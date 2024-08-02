// @ts-check

import { queryAllFutureComponent } from '../query/queryAllFutureComponent';
import { getuserPlaceHolder } from '../webComponent/usePlaceHolderToRender';

const useQuery = false;

/**
 * @param {object} obj
 * @param {Element} obj.element
 * @param {Array<import("../webComponent/type").userComponent>} obj.currentSelectors
 * @return {{componentToParse:import("../webComponent/type").userComponent, parseSourceArray:Array<import("../webComponent/type").userComponent> }}
 */
export const getParseSourceArray = ({ element, currentSelectors }) => {
    if (currentSelectors.length > 0) {
        const componentToParse = currentSelectors[0];
        const parseSourceArray = currentSelectors.slice(1);

        return { componentToParse, parseSourceArray };
    } else {
        const query = useQuery
            ? [...queryAllFutureComponent(element)]
            : getuserPlaceHolder(element);

        const componentToParse = query?.[0];
        const parseSourceArray = query.slice(1);

        return { componentToParse, parseSourceArray };
    }
};
