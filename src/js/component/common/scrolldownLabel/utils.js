// @ts-check

import { setStateByName } from '../../../mobjs';

/**
 * @import { SetStateByName } from '../../../mobjs/type';
 **/

/** @type{() => void} */
export const activateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = setStateByName('scroll_down_label');
    setScrollDownState('active', true);
};

/** @type{() => void} */
export const deactivateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = setStateByName('scroll_down_label');
    setScrollDownState('active', false);
};
