import {
    getRepeatOrInvalidateInsideElement,
    MODULE_REPEATER,
} from '../../common-repeat-invalidate';

/**
 * Initialize watch function of nested repeat.
 *
 * Start initialize from older one, so child repeat is render after parent repeat
 *
 * @param {object} params
 * @param {HTMLElement | undefined} params.repeatParent - Module parent HTMLElement
 * @param {string} params.id - Component id witch contain moduleParent is defined.
 * @returns {void}
 */
export const inizializeNestedRepeat = ({ repeatParent, id }) => {
    if (!repeatParent) return;

    /**
     * PlaceholderMap
     *
     * - Find module to initialize from modulePlaceholderMap
     * - Module must contained in moduleParent element
     */
    const repeaterToInitialize = getRepeatOrInvalidateInsideElement({
        moduleParentElement: repeatParent,
        skipInitialized: true,
        onlyInitialized: false,
        componentId: id,
        module: MODULE_REPEATER,
    });

    repeaterToInitialize.forEach(({ fn: initilizeFunction }) => {
        initilizeFunction();
    });
};
