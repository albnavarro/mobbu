import { repeatFunctionMap } from '../repeat-function-map';
import {
    getRepeatOrInvalidateInsideElement,
    MODULE_REPEATER,
} from '../../common-repeat-invalidate';

/**
 * Initialize watch function of nested repeat. Start initialize from older one, so child repeat is render after parent
 * repeat
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.repeatParent
 * @param {string} params.id - ComponentId
 * @returns {void}
 */
export const inizializeNestedRepeat = ({ repeatParent, id }) => {
    if (!repeatParent) return;

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
