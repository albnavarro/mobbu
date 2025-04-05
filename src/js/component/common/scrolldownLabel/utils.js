// @ts-check

import { MobJs } from '../../../mob/mobjs';

/**
 * @import { SetStateByName } from '../../../mob/mobjs/type';
 **/

/** @type{() => void} */
export const activateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = MobJs.setStateByName('scroll_down_label');
    setScrollDownState('active', true);
};

/** @type{() => void} */
export const deactivateScrollDownArrow = () => {
    /** @type {SetStateByName<import('./type').ScrollDownLabel>} */
    const setScrollDownState = MobJs.setStateByName('scroll_down_label');
    setScrollDownState('active', false);
};
