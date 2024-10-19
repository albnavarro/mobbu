import { repeatFunctionMap } from '../repeatFunctionMap';
import {
    getRepeatOrInvalidateInsideElement,
    MODULE_REPEATER,
} from '../../commonRepeatInvalidate';

/**
 * @description
 * Initialize watch function of nested repeat.
 * Start initialize from older one, so child repeat is render after parent repeat
 *
 * @param {object} params
 * @param {HTMLElement} params.repeatParent
 * @param {string} params.id - componentId
 * @returns {void}
 */
export const inizializeNestedRepeat = ({ repeatParent, id }) => {
    const newRepeatChild = getRepeatOrInvalidateInsideElement({
        element: repeatParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_REPEATER,
    });

    const repeatChildToInizialize = [...repeatFunctionMap.values()]
        .flat()
        .filter(({ repeatId }) => {
            return newRepeatChild.some((current) => {
                return current.id === repeatId;
            });
        });

    repeatChildToInizialize.forEach(({ fn }) => {
        fn();
    });
};
